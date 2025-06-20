import React, { useEffect, useState } from "react"
import { Modal, View, Text, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from "react-native"
import { Picker } from "@react-native-picker/picker"
import BrandServices from "../../services/servicesBackend/BrandServices"
import ColorServices from "../../services/servicesBackend/ColorServices"
import styles from "./VariacaoModal.style"
import { COLORS } from "../../constants/tema"

const VariacaoModal = ({ visible, onClose, onSave, initialData = null, mode = "create" }) => {
    const [brands, setBrands] = useState([])
    const [colors, setColors] = useState([])
    const [brandId, setBrandId] = useState(null)
    const [colorId, setColorId] = useState(null)
    const [price, setPrice] = useState("")
    const [errors, setErrors] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [brandsData, colorsData] = await Promise.all([
                    BrandServices.getAllBrandsByCompanyId(true),
                    ColorServices.getAllColorsByCompanyId(true),
                ])

                setBrands(brandsData)
                setColors(colorsData)

                if (initialData) {
                    const matchedBrand = brandsData.find(b => b.name === initialData.brand?.name)
                    const matchedColor = colorsData.find(c => c.name === initialData.color?.name)

                    setBrandId(matchedBrand?.id || null)
                    setColorId(matchedColor?.id || null)
                    setPrice(
                        initialData.price !== undefined
                            ? Number(initialData.price).toFixed(2).replace(".", ",")
                            : ""
                    )
                } else {
                    setBrandId(null)
                    setColorId(null)
                    setPrice("")
                }
            } catch (err) {
                console.error("❌ Erro ao carregar marcas e cores:", err)
            }
        }

        if (visible) {
            fetchData()
        }
    }, [visible, initialData])

    const validate = () => {
        const newErrors = {}
        if (!brandId) newErrors.brandId = true
        const priceNumber = parseFloat(price.replace(",", "."))
        if (!price || isNaN(priceNumber) || priceNumber <= 0) newErrors.price = true
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSave = () => {
        if (!validate()) return

        const data = {
            brandId,
            colorId,
            price: parseFloat(price.replace(",", ".")),
            ...(initialData?.id && { id: initialData.id }),
        }
        onSave(data)
    }

    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.overlay}>
                    <View style={styles.container}>
                        <Text style={styles.title}>
                            {mode === "edit" ? "Editar Variação" : "Nova Variação"}
                        </Text>

                        <Text style={styles.label}>Marca *</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={brandId}
                                onValueChange={setBrandId}
                                style={styles.picker}
                                dropdownIconColor={COLORS.cinza}
                            >
                                <Picker.Item label="Selecione a marca" value={null} />
                                {brands.map((brand) => (
                                    <Picker.Item key={brand.id} label={brand.name} value={brand.id} />
                                ))}
                            </Picker>
                        </View>
                        {errors.brandId && <Text style={styles.errorText}>Marca obrigatória.</Text>}

                        <Text style={styles.label}>Cor (opcional)</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={colorId}
                                onValueChange={setColorId}
                                style={styles.picker}
                                dropdownIconColor={COLORS.cinza}
                            >
                                <Picker.Item label="Sem cor" value={null} />
                                {colors.map((color) => (
                                    <Picker.Item key={color.id} label={color.name} value={color.id} />
                                ))}
                            </Picker>
                        </View>

                        <Text style={styles.label}>Preço *</Text>
                        <TextInput
                            placeholder="Ex: 35,90"
                            keyboardType="numeric"
                            value={price}
                            onChangeText={setPrice}
                            style={[styles.input, errors.price && styles.errorInput]}
                        />
                        {errors.price && <Text style={styles.errorText}>Preço inválido.</Text>}

                        <View style={styles.footer}>
                            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
                                <Text style={styles.cancelText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                                <Text style={styles.saveText}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

export default VariacaoModal