import { StyleSheet } from "react-native"
import { COLORS, FONT_SIZE } from "../../constants/tema"

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16
  },
  modalContainer: {
    backgroundColor: COLORS.salMarinho,
    borderRadius: 20,
    width: '100%',
    maxHeight: '92%',
    overflow: 'hidden',
    elevation: 8,
    shadowColor: COLORS.preto,
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 }
  },
  scrollContent: {
    padding: 24
  },
  title: {
    fontSize: FONT_SIZE.lg2,
    fontWeight: "bold",
    color: COLORS.marromEscuro,
    marginBottom: 18,
    textAlign: 'center'
  },
  errorMessage: {
    color: 'red',
    fontSize: FONT_SIZE.sm,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: '500'
  },
  label: {
    color: COLORS.marromClaro,
    fontSize: FONT_SIZE.sm,
    marginBottom: 4,
    marginTop: 8,
    fontWeight: '500'
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.cinzaClaro,
    backgroundColor: COLORS.branco,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 14,
    fontSize: FONT_SIZE.md,
    color: COLORS.cinzaEscuro
  },
  smallInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.cinzaClaro,
    backgroundColor: COLORS.branco,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 14,
    fontSize: FONT_SIZE.md,
    color: COLORS.cinzaEscuro,
    minWidth: 0
  },
  errorInput: {
    borderColor: COLORS.vermelho
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 8,
    marginTop: 0
  },
  inline: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12
  },
  typeButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: COLORS.cinzaClaro,
    borderRadius: 20,
    marginRight: 8
  },
  selectedTypeButton: {
    backgroundColor: COLORS.marrom,
    borderColor: COLORS.marromEscuro,
    borderWidth: 1
  },
  typeButtonText: {
    color: COLORS.branco,
    fontWeight: '600'
  },
  toggleText: {
    color: COLORS.marrom,
    marginVertical: 10,
    fontSize: FONT_SIZE.sm,
    fontWeight: "500"
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: COLORS.cinzaClaro,
    borderRadius: 8,
    backgroundColor: COLORS.branco,
    marginVertical: 10,
    overflow: "hidden", 
  },
  picker: {
    color: COLORS.cinzaEscuro, 
    fontSize: FONT_SIZE.sm, 
    height: 55, 
  },
  addButton: {
    backgroundColor: COLORS.verdeClaro,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center'
  },
  addButtonText: {
    color: COLORS.salMarinho,
    fontWeight: 'bold',
    fontSize: FONT_SIZE.md
  },
  subtitle: {
    fontSize: FONT_SIZE.md2,
    fontWeight: 'bold',
    marginVertical: 16,
    color: COLORS.marromEscuro
  },
  variationBox: {
    backgroundColor: COLORS.linho,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.marromClaro
  },
  variationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6
  },
  variationText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.marromEscuro,
    fontWeight: '500'
  },
  variationActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  variationInput: {
    flex: 1,
    backgroundColor: COLORS.branco,
    borderWidth: 1,
    borderColor: COLORS.cinzaClaro,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    fontSize: FONT_SIZE.sm,
    color: COLORS.cinzaEscuro,
    marginBottom: 5
  },
  removeText: {
    color: COLORS.vermelho,
    fontSize: FONT_SIZE.xsm,
    fontWeight: 'bold',
    marginLeft: 8
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 28
  },
  cancelButton: {
    backgroundColor: COLORS.cinzaClaro,
    paddingVertical: 12,
    borderRadius: 10,
    flex: 1,
    marginRight: 8,
    alignItems: 'center'
  },
  cancelText: {
    color: COLORS.cinzaEscuro,
    fontWeight: "bold",
    fontSize: FONT_SIZE.md
  },
  saveButton: {
    backgroundColor: COLORS.marrom,
    paddingVertical: 12,
    borderRadius: 10,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center'
  },
  saveText: {
    color: COLORS.salMarinho,
    fontWeight: "bold",
    fontSize: FONT_SIZE.md
  }
})