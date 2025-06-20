import { faPlus } from "@fortawesome/free-solid-svg-icons"

const PopupOptions = (onSelectOption) => [
  { label: "Estante", icon: faPlus, onPress: () => onSelectOption("estante") },
  { label: "Produto", icon: faPlus, onPress: () => onSelectOption("produto") },
  { label: "Marca", icon: faPlus, onPress: () => onSelectOption("marca") },
  { label: "Cor", icon: faPlus, onPress: () => onSelectOption("cor") },
  { label: "Unidade", icon: faPlus, onPress: () => onSelectOption("unidade") },
  { label: "Prateleira", icon: faPlus, onPress: () => onSelectOption("prateleira") },
]

export default PopupOptions
