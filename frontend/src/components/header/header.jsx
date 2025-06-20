import { useState, useCallback, useRef, useEffect } from "react"
import { View } from "react-native"
import { useNavigation, useFocusEffect } from "@react-navigation/native"
import Search from "./search/search"
import styles from "./header.style"
import ProductServices from "../../services/servicesBackend/ProductServices"
import { getUserData } from "../../services/storageService"

function Header({ onProductsChange, clearSearchSignal }) {
  const [search, setSearch] = useState("")
  const [produtos, setProdutos] = useState([])
  const navigation = useNavigation()
  const inputRef = useRef(null)

  async function handleSearch(text) {
    setSearch(text)

    if (text.length > 0) {
      const user = await getUserData()
      const companyId = user.companyId
      try {
        const data = await ProductServices.searchProducts(companyId, text)
        setProdutos(data.products)
        if (onProductsChange) onProductsChange(data.products)
      } catch (e) {
        setProdutos([])
      }
    } else {
      setProdutos([])
      if (onProductsChange) onProductsChange([])
    }
  }

  function handleSelectProduct(produto) {
    setSearch(produto.name)
    setProdutos([])
    if (inputRef.current) inputRef.current.blur()
    navigation.navigate("item", { productId: produto.id })
  }


  function handleBlur() {
    setProdutos([])
  }


  useFocusEffect(
    useCallback(() => {
      return () => {
        setSearch("")
        setProdutos([])
        if (onProductsChange) onProductsChange([])
      }
    }, [])
  )

  useEffect(() => {
    if (clearSearchSignal?.current) {
      clearSearchSignal.current = false
      setSearch("")
      setProdutos([])
      if (onProductsChange) onProductsChange([])
    }
  }, [clearSearchSignal?.current, onProductsChange, clearSearchSignal])

  return (
    <View style={styles.container}>
      <Search
        onChangeText={handleSearch}
        value={search}
        produtos={produtos}
        onSelectProduct={handleSelectProduct}
        onBlur={handleBlur}
        inputRef={inputRef}
      />
    </View>
  )
}

export default Header