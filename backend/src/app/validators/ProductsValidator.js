class ProductsValidator {
  async validate(data) {
    const errors = []

    // Validar nome
    if (!data.name) {
      errors.push('Nome do produto é obrigatório')
    } else if (data.name.length < 2) {
      errors.push('Nome deve ter pelo menos 2 caracteres')
    } else if (data.name.length > 100) {
      errors.push('Nome não pode exceder 100 caracteres')
    }

    // Validar descrição (opcional)
    if (data.description && data.description.length > 500) {
      errors.push('Descrição não pode exceder 500 caracteres')
    }

    // Validar embalagem sigla
    if (!data.embalagemSigla) {
      errors.push('Sigla da embalagem é obrigatória')
    } else if (data.embalagemSigla.length !== 2) {
      errors.push('Sigla deve ter exatamente 2 caracteres')
    } else if (data.embalagemSigla !== data.embalagemSigla.toUpperCase()) {
      errors.push('Sigla deve estar em letras maiúsculas')
    }

    // Validar quantidade de embalagem
    if (!data.qtEmbalagem) {
      errors.push('ID da quantidade de embalagem é obrigatório')
    }

    // Validar prateleira
    if (!data.shelfId) {
      errors.push('ID da prateleira é obrigatório')
    }

    // Validar empresa
    if (!data.companyId) {
      errors.push('ID da empresa é obrigatório')
    }

    // Validar usuário
    if (!data.userId) {
      errors.push('ID do usuário é obrigatório')
    }

    // Validar variações se existirem
    if (data.variations && Array.isArray(data.variations)) {
      data.variations.forEach((variation, index) => {
        if (!variation.brandId) {
          errors.push(`ID da marca é obrigatório para variação ${index + 1}`)
        }
        if (!variation.price || variation.price <= 0) {
          errors.push(`Preço deve ser positivo para variação ${index + 1}`)
        }
      })
    }

    if (errors.length > 0) {
      throw new Error(errors.join(', '))
    }

    return data
  }

  async validateUpdate(data) {
    const errors = []

    // Validar nome se fornecido
    if (data.name !== undefined) {
      if (data.name.length < 2) {
        errors.push('Nome deve ter pelo menos 2 caracteres')
      } else if (data.name.length > 100) {
        errors.push('Nome não pode exceder 100 caracteres')
      }
    }

    // Validar descrição se fornecida
    if (data.description !== undefined && data.description.length > 500) {
      errors.push('Descrição não pode exceder 500 caracteres')
    }

    // Validar embalagem sigla se fornecida
    if (data.embalagemSigla !== undefined) {
      if (data.embalagemSigla.length !== 2) {
        errors.push('Sigla deve ter exatamente 2 caracteres')
      } else if (data.embalagemSigla !== data.embalagemSigla.toUpperCase()) {
        errors.push('Sigla deve estar em letras maiúsculas')
      }
    }

    // Validar variações atualizadas
    if (data.updatedVariations && Array.isArray(data.updatedVariations)) {
      data.updatedVariations.forEach((variation, index) => {
        if (!variation.id) {
          errors.push(`ID é obrigatório para variação atualizada ${index + 1}`)
        }
        if (!variation.brandId) {
          errors.push(`ID da marca é obrigatório para variação atualizada ${index + 1}`)
        }
        if (!variation.price || variation.price <= 0) {
          errors.push(`Preço deve ser positivo para variação atualizada ${index + 1}`)
        }
      })
    }

    // Validar novas variações
    if (data.newVariations && Array.isArray(data.newVariations)) {
      data.newVariations.forEach((variation, index) => {
        if (!variation.brandId) {
          errors.push(`ID da marca é obrigatório para nova variação ${index + 1}`)
        }
        if (!variation.price || variation.price <= 0) {
          errors.push(`Preço deve ser positivo para nova variação ${index + 1}`)
        }
      })
    }

    if (errors.length > 0) {
      throw new Error(errors.join(', '))
    }

    return data
  }
}

export default new ProductsValidator()