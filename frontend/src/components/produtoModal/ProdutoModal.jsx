import React, { useState, useEffect } from "react"
import { Modal, View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native"
import { Picker } from "@react-native-picker/picker"
import styles from "./ProdutoModal.style"
import { getUserData } from "../../services/storageService"
import ColorServices from "../../services/servicesBackend/ColorServices"
import BrandServices from "../../services/servicesBackend/BrandServices"
import ProductsServices from "../../services/servicesBackend/ProductServices"
import EmbalagemServices from "../../services/servicesBackend/EmbalagemServices"
import { useRoute } from "@react-navigation/native"
import { COLORS } from "../../constants/tema"

function capitalizeFirst(str) {
    if (!str) return ""
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

function getCombinationKey(brandId, colorId) {
    return `${brandId || ""}-${colorId || ""}`
}

const ProdutoModal = ({
    visible,
    onClose,
    onSave,
    initialData = null,
    mode = "create"
}) => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [embalagemSigla, setEmbalagemSigla] = useState("")
    const [embalagemName, setEmbalagemName] = useState("")
    const [qtEmbalagem, setQtEmbalagem] = useState("")
    const [brands, setBrands] = useState([])
    const [colors, setColors] = useState([])
    const [selectedBrand, setSelectedBrand] = useState(null)
    const [selectedColor, setSelectedColor] = useState(null)
    const [showColors, setShowColors] = useState(false)
    const [combinations, setCombinations] = useState([])
    const [priceMap, setPriceMap] = useState({})
    const [errors, setErrors] = useState(false)
    const [combinationError, setCombinationError] = useState(false)
    const [companyId, setCompanyId] = useState(null)
    const [deletedVariationIds, setDeletedVariationIds] = useState([])
    const [isFetchingEmbalagemName, setIsFetchingEmbalagemName] = useState(false)
    const route = useRoute()
    let { shelfId } = route.params || {}

    useEffect(() => {
        if (visible && mode === "create") {
            setName("")
            setDescription("")
            setEmbalagemSigla("")
            setEmbalagemName("")
            setQtEmbalagem("")
            setSelectedBrand(null)
            setSelectedColor(null)
            setShowColors(false)
            setCombinations([])
            setPriceMap({})
            setErrors(false)
            setCombinationError(false)
            setDeletedVariationIds([])
        }
    }, [visible, mode])

    useEffect(() => {
        if (embalagemSigla) {
            setIsFetchingEmbalagemName(true)
            EmbalagemServices.getEmbalagemBySigla(embalagemSigla.trim().toUpperCase())
                .then(data => {
                    if (data && data.name) setEmbalagemName(data.name)
                    else setEmbalagemName("")
                })
                .catch(err => {
                    setEmbalagemName("")
                })
                .finally(() => setIsFetchingEmbalagemName(false))
        } else {
            setEmbalagemName("")
        }
    }, [embalagemSigla])

    useEffect(() => {
        if (initialData && mode === "edit") {
            setName(initialData.name || "")
            setDescription(initialData.description || "")
            setEmbalagemSigla(initialData.embalagemSigla || "")
            setQtEmbalagem(
                initialData.qtEmbalagem?.quantity ||
                initialData.qtEmbalagem ||
                ""
            )
            if (initialData.productPrice && Array.isArray(initialData.productPrice)) {
                const loadedCombinations = []
                const loadedPriceMap = {}
                initialData.productPrice.forEach(variation => {
                    const key = getCombinationKey(variation.brand?.id, variation.color?.id)
                    loadedCombinations.push({
                        key,
                        displayKey: `${variation.brand?.name || "?"}${variation.color ? " - " + variation.color?.name : ""}`,
                        id: variation.id,
                        brandId: variation.brand?.id,
                        colorId: variation.color?.id || null,
                    })
                    loadedPriceMap[key] = variation.price?.toString().replace(".", ",") || ""
                })
                setCombinations(loadedCombinations)
                setPriceMap(loadedPriceMap)
            }
        }
    }, [initialData, mode])

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await getUserData()
                setCompanyId(user.companyId)
            } catch (error) {
            }
        }
        fetchUserData()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            if (!companyId) return
            try {
                const [brands, colors] = await Promise.all([
                    BrandServices.getAllBrandsByCompanyId(true),
                    ColorServices.getAllColorsByCompanyId(true),
                ])
                setBrands(brands)
                setColors(colors)
            } catch (error) {
            }
        }
        fetchData()
    }, [companyId])

    const validateForm = () => {
        return (
            name.trim() &&
            description.trim() &&
            embalagemSigla.trim() &&
            embalagemName.trim() &&
            Number(qtEmbalagem) > 0 &&
            combinations.length > 0 &&
            combinations.every(comb => priceMap[comb.key] && parseFloat((priceMap[comb.key] || "0").replace(",", ".")) > 0)
        )
    }

    const addCombination = () => {
        if (!selectedBrand) {
            setCombinationError("Selecione uma marca para adicionar a variação.")
            return
        }
        const brandName = brands.find(brand => brand.id === selectedBrand)?.name
        const colorName = colors.find(color => color.id === selectedColor)?.name
        const key = getCombinationKey(selectedBrand, selectedColor)
        const displayKey = colorName ? `${brandName} - ${colorName}` : `${brandName}`

        if (combinations.some(comb => comb.key === key)) {
            setCombinationError("Já existe uma variação com essa marca/cor.")
            return
        }
        setCombinations(prev => [
            ...prev,
            {
                key,
                displayKey,
                brandId: selectedBrand,
                colorId: selectedColor,
            }
        ])
        setCombinationError(false)
        setSelectedColor(null)
    }

    const removeCombination = key => {
        const comb = combinations.find(comb => comb.key === key)
        if (comb && comb.id) {
            setDeletedVariationIds(prev => [...prev, comb.id])
        }
        setCombinations(prev => prev.filter(comb => comb.key !== key))
        setPriceMap(prev => {
            const updated = { ...prev }
            delete updated[key]
            return updated
        })
    }

    const setCombinationPrice = (key, value) => {
        setPriceMap(prev => ({ ...prev, [key]: value }))
    }

    const handleSave = async () => {
        if (!validateForm()) {
            setErrors(true)
            return
        }
        setErrors(false)
        onClose()

        const user = await getUserData()

        const updatedVariations = []
        const newVariations = []
        combinations.forEach(comb => {
            const price = parseFloat((priceMap[comb.key] || "0").replace(",", "."))
            if (price <= 0) return

            const payload = {
                brandId: comb.brandId,
                colorId: comb.colorId,
                price,
            }
            if (comb.id) {
                updatedVariations.push({ ...payload, id: comb.id })
            } else {
                newVariations.push(payload)
            }
        })

        const formattedSigla = embalagemSigla.trim().toUpperCase()
        const formattedName = capitalizeFirst(embalagemName.trim())

        const produto = {
            name,
            description,
            embalagemSigla: formattedSigla,
            embalagemName: formattedName,
            qtEmbalagem: Number(qtEmbalagem),
            shelfId,
            companyId: user.companyId,
            userId: user.id,
            ...(mode === "edit" && { updatedVariations, newVariations, deletedVariationIds }),
            ...(mode === "create" && { variations: [...updatedVariations, ...newVariations] }),
        }

        try {
            let response
            if (mode === "edit") {
                response = await ProductsServices.updateProduct(initialData.id, produto)
            } else {
                response = await ProductsServices.createProduct(produto)
            }
            onSave && onSave(response)
        } catch (error) {
        }
    }

    const resetForm = () => {
        setName("")
        setDescription("")
        setEmbalagemSigla("")
        setEmbalagemName("")
        setQtEmbalagem("")
        setSelectedBrand(null)
        setSelectedColor(null)
        setCombinations([])
        setPriceMap({})
        setErrors(false)
        setCombinationError(false)
        setDeletedVariationIds([])
    }

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        <Text style={styles.title}>
                            {mode === "edit" ? "Editar Produto" : "Criar Produto"}
                        </Text>
                        {errors && (
                            <Text style={styles.errorMessage}>
                                Por favor, preencha todos os campos obrigatórios.
                            </Text>
                        )}
                        {combinationError && (
                            <Text style={styles.errorMessage}>
                                {combinationError}
                            </Text>
                        )}

                        <Text style={styles.label}>Nome *</Text>
                        <TextInput
                            placeholder="Ex: Tinta acrílica"
                            value={name}
                            onChangeText={text => { setName(text); setErrors(false) }}
                            style={[styles.input, errors && !name.trim() && styles.errorInput]}
                        />

                        <Text style={styles.label}>Descrição *</Text>
                        <TextInput
                            placeholder="Ex: Ideal para ambientes internos"
                            value={description}
                            onChangeText={text => { setDescription(text); setErrors(false) }}
                            style={[styles.input, errors && !description.trim() && styles.errorInput]}
                        />

                        <Text style={styles.label}>Embalagem *</Text>
                        <View style={styles.row}>
                            <TextInput
                                placeholder="Sigla (ex: CX)"
                                value={embalagemSigla}
                                onChangeText={text => { setEmbalagemSigla(text); setErrors(false) }}
                                style={[styles.smallInput, errors && !embalagemSigla.trim() && styles.errorInput]}
                                maxLength={6}
                                autoCapitalize="characters"
                            />
                            <TextInput
                                placeholder="Nome (ex: Caixa)"
                                value={embalagemName}
                                onChangeText={text => setEmbalagemName(text)}
                                style={[styles.smallInput, errors && !embalagemName.trim() && styles.errorInput]}
                                maxLength={25}
                                autoCapitalize="words"
                                editable={false}
                            />
                        </View>

                        <Text style={styles.label}>Quantidade Embalagem *</Text>
                        <TextInput
                            placeholder="Ex: 40"
                            value={qtEmbalagem?.toString() || ""}
                            keyboardType="numeric"
                            onChangeText={text => { setQtEmbalagem(text); setErrors(false) }}
                            style={[styles.input, errors && (!qtEmbalagem || qtEmbalagem <= 0) && styles.errorInput]}
                        />

                        {mode === "create" && (
                            <>
                                <Text style={styles.label}>Marca *</Text>
                                <View style={styles.pickerContainer}>
                                    <Picker
                                        selectedValue={selectedBrand}
                                        onValueChange={(val) => {
                                            setSelectedBrand(val)
                                            setCombinationError(false)
                                        }}
                                        style={styles.picker}
                                        dropdownIconColor={COLORS.cinza}
                                    >
                                        <Picker.Item label="Selecione a marca" value={null} />
                                        {brands.map(brand => (
                                            <Picker.Item key={brand.id} label={brand.name} value={brand.id} />
                                        ))}
                                    </Picker>
                                </View>
                                <TouchableOpacity onPress={() => setShowColors(!showColors)}>
                                    <Text style={styles.toggleText}>
                                        {showColors ? "Ocultar cores" : "Adicionar cor?"}
                                    </Text>
                                </TouchableOpacity>
                                {showColors && (
                                    <View style={styles.pickerContainer}>
                                        <Picker
                                            selectedValue={selectedColor}
                                            onValueChange={val => setSelectedColor(val)}
                                            style={styles.picker}
                                            dropdownIconColor={COLORS.cinza}
                                        >
                                            <Picker.Item label="Selecione a cor" value={null} />
                                            {colors.map(color => (
                                                <Picker.Item key={color.id} label={color.name} value={color.id} />
                                            ))}
                                        </Picker>
                                    </View>
                                )}
                                <TouchableOpacity onPress={addCombination} style={styles.addButton}>
                                    <Text style={styles.addButtonText}>Adicionar Variação</Text>
                                </TouchableOpacity>
                            </>
                        )}

                        {combinations.length > 0 && (
                            <View>
                                <Text style={styles.subtitle}>Variações:</Text>
                                {combinations.map(({ key, displayKey, brandId, colorId }) => (
                                    <View key={key} style={styles.variationBox}>
                                        <Text style={styles.variationText}>{displayKey}</Text>
                                        <Text style={styles.variationTextSmall}>
                                            Marca: {brands.find(b => b.id === brandId)?.name || "-"}
                                            {colorId ? ` | Cor: ${colors.find(c => c.id === colorId)?.name || "-"}` : ""}
                                        </Text>
                                        {mode === "create" ? (
                                            <TextInput
                                                placeholder="Preço ex: 29.90"
                                                keyboardType="numeric"
                                                value={priceMap[key] || ""}
                                                onChangeText={text => setCombinationPrice(key, text)}
                                                style={styles.variationInput}
                                            />
                                        ) : (
                                            <View style={[styles.variationInput, { justifyContent: "center" }]}>
                                                <Text style={{ color: COLORS.preto }}>
                                                    {priceMap[key] || ""}
                                                </Text>
                                            </View>
                                        )}
                                        {mode === "create" && (
                                            <TouchableOpacity onPress={() => removeCombination(key)}>
                                                <Text style={styles.removeText}>Remover</Text>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                ))}
                            </View>
                        )}

                        <View style={styles.footerButtons}>
                            <TouchableOpacity onPress={() => { resetForm(); onClose(); }} style={styles.cancelButton}>
                                <Text style={styles.cancelText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                                <Text style={styles.saveText}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )
}

export default ProdutoModal