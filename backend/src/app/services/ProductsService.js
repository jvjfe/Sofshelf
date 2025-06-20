import prisma from "../helpers/prisma"
import ProductsValidator from "../validators/ProductsValidator"

class ProductsService {
  async createProduct(data) {
    try {
      await ProductsValidator.validate(data)

      const {
        name,
        description,
        embalagemSigla,
        qtEmbalagem,
        shelfId,
        companyId,
        userId,
        variations
      } = data

      const product = await prisma.product.create({
        data: {
          name,
          description,
          embalagemSigla,
          qtEmbalagemId: qtEmbalagem,
          shelfId,
          companyId,
          userId
        }
      })

      if (variations && variations.length > 0) {
        for (const variation of variations) {
          const { brandId, price, colorId } = variation

          const data = {
            product: { connect: { id: product.id } },
            brand: { connect: { id: brandId } },
            price: parseFloat(price),
            company: { connect: { id: companyId } },
            user: { connect: { id: userId } },
            ...(colorId ? { color: { connect: { id: colorId } } } : {})
          }

          await prisma.productPrice.create({ data })
        }
      }

      return await this.getProductById(product.id)
    } catch (error) {
      throw new Error(`Falha ao criar o produto: ${error.message}`)
    }
  }

  async updateProduct(id, data) {
    try {
      const {
        name,
        description,
        embalagemSigla,
        qtEmbalagem,
        shelfId,
        companyId,
        userId,
        updatedVariations = [],
        newVariations = [],
        deletedVariationIds = []
      } = data

      await prisma.product.update({
        where: { id },
        data: {
          name,
          description,
          embalagemSigla,
          qtEmbalagemId: qtEmbalagem,
          shelfId,
          companyId,
          userId
        }
      })

      for (const variation of updatedVariations) {
        const { id: variationId, brandId, colorId, price } = variation
        try {
          await prisma.productPrice.update({
            where: { id: variationId },
            data: {
              brand: { connect: { id: brandId } },
              price: parseFloat(price),
              ...(colorId ? { color: { connect: { id: colorId } } } : {}),
              company: { connect: { id: companyId } },
              user: { connect: { id: userId } }
            }
          })
        } catch (err) {
          console.error('Erro ao atualizar variação', variationId, err)
        }
      }

      for (const variation of newVariations) {
        const { brandId, colorId, price } = variation
        try {
          await prisma.productPrice.create({
            data: {
              product: { connect: { id } },
              brand: { connect: { id: brandId } },
              price: parseFloat(price),
              ...(colorId ? { color: { connect: { id: colorId } } } : {}),
              company: { connect: { id: companyId } },
              user: { connect: { id: userId } }
            }
          })
        } catch (err) {
          console.error('Erro ao criar variação', err)
        }
      }

      for (const variationId of deletedVariationIds) {
        try {
          await prisma.productPrice.delete({
            where: { id: variationId }
          })
        } catch (err) {
          console.error('Erro ao deletar variação', variationId, err)
        }
      }

      const updated = await this.getProductById(id)
      return updated
    } catch (error) {
      console.error('Erro no ProductsService.updateProduct:', error)
      throw new Error(`Falha ao atualizar o produto: ${error.message}`)
    }
  }

  async deleteProduct(id, status = false) {
    try {

      console.log("id service", id)
      console.log("status service", status)
      const product = await prisma.product.update({
        where: { id },
        data: { status }
      })

      return product
    } catch (error) {
      throw new Error(`Erro ao alterar status do produto: ${error.message}`)
    }
  }

  async getAllProductsByShelf(shelfId, statusFilter) {
    try {
      const products = await prisma.product.findMany({
        where: {
          shelfId,
          status: statusFilter
        },
        select: {
          id: true,
          name: true,
          description: true,
          status: true,
          createdAt: true,
          updatedAt: true,
          embalagem: {
            select: {
              sigla: true,
              name: true
            }
          },
          qtEmbalagem: {
            select: {
              id: true,
              quantity: true
            }
          },
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          company: {
            select: {
              id: true,
              name: true,
              ownerId: true,
              companyEmail: true
            }
          },
          shelf: {
            select: {
              id: true,
              name: true,
              status: true,
              rack: {
                select: {
                  id: true,
                  name: true,
                  description: true
                }
              }
            }
          },
          ProductPrice: {
            select: {
              id: true,
              price: true,
              brand: {
                select: {
                  id: true,
                  name: true
                }
              },
              color: {
                select: {
                  id: true,
                  name: true,
                  hexCode: true
                }
              },
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true
                }
              },
              company: {
                select: {
                  id: true,
                  name: true,
                  ownerId: true,
                  companyEmail: true
                }
              }
            }
          }
        }
      })

      return products
    } catch (error) {
      throw new Error(`Erro ao buscar produtos da estante: ${error.message}`)
    }
  }

  async getAllProductsByCompany(companyId, statusFilter) {
    try {
      const products = await prisma.product.findMany({
        where: {
          companyId,
          status: statusFilter
        },
        select: {
          id: true,
          name: true,
          description: true,
          status: true,
          embalagemSigla: true,
          createdAt: true,
          updatedAt: true,
          embalagem: {
            select: {
              sigla: true,
              name: true
            }
          },
          qtEmbalagem: {
            select: {
              id: true,
              quantity: true
            }
          },
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          company: {
            select: {
              id: true,
              name: true,
              ownerId: true,
              companyEmail: true
            }
          },
          shelf: {
            select: {
              id: true,
              name: true,
              status: true,
              rack: {
                select: {
                  id: true,
                  name: true,
                  description: true
                }
              }
            }
          },
          ProductPrice: {
            select: {
              id: true,
              price: true,
              brand: {
                select: {
                  id: true,
                  name: true
                }
              },
              color: {
                select: {
                  id: true,
                  name: true,
                  hexCode: true
                }
              },
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true
                }
              },
              company: {
                select: {
                  id: true,
                  name: true,
                  ownerId: true,
                  companyEmail: true
                }
              }
            }
          }
        }
      })

      return products
    } catch (error) {
      throw new Error(`Erro ao buscar produtos da empresa ${error.message}`)
    }
  }

  async getProductById(id) {
    try {
      const product = await prisma.product.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          description: true,
          status: true,
          embalagemSigla: true,
          createdAt: true,
          updatedAt: true,
          embalagem: {
            select: {
              sigla: true,
              name: true
            }
          },
          qtEmbalagem: {
            select: {
              id: true,
              quantity: true
            }
          },
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          company: {
            select: {
              id: true,
              name: true,
              ownerId: true,
              companyEmail: true
            }
          },
          shelf: {
            select: {
              id: true,
              name: true,
              status: true,
              rack: {
                select: {
                  id: true,
                  name: true,
                  description: true
                }
              }
            }
          },
          ProductPrice: {
            select: {
              id: true,
              price: true,
              brand: {
                select: {
                  id: true,
                  name: true
                }
              },
              color: {
                select: {
                  id: true,
                  name: true,
                  hexCode: true
                }
              },
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true
                }
              },
              company: {
                select: {
                  id: true,
                  name: true,
                  ownerId: true,
                  companyEmail: true
                }
              }
            }
          }
        }
      })

      if (!product) throw new Error('Produto não encontrado')

      const movimentacoes = await prisma.movement.findMany({
        where: { productId: id }
      })

      const totalEntradas = movimentacoes
        .filter(mov => mov.action === "entrada")
        .reduce((total, mov) => total + mov.quantity, 0)

      const totalSaidas = movimentacoes
        .filter(mov => mov.action === "saida")
        .reduce((total, mov) => total + mov.quantity, 0)

      const estoqueAtual = totalEntradas - totalSaidas

      const variacoesMap = {}
      movimentacoes.forEach(mov => {
        if (!mov.productPrice) return
        const id = mov.productPrice
        if (!variacoesMap[id]) variacoesMap[id] = { entradas: 0, saidas: 0 }
        if (mov.action === "entrada") variacoesMap[id].entradas += mov.quantity
        if (mov.action === "saida") variacoesMap[id].saidas += mov.quantity
      })

      const productPrice = product.ProductPrice.map(variacao => {
        const mov = variacoesMap[variacao.id] || { entradas: 0, saidas: 0 }
        const estoqueAtual = mov.entradas - mov.saidas
        return { ...variacao, estoqueAtual }
      })

      return { ...product, estoqueAtual, productPrice }
    } catch (error) {
      throw new Error(`Erro ao buscar produto: ${error.message}`)
    }
  }

  async searchProducts({ companyId, searchText }) {
    try {
      const where = {
        companyId,
        status: true, // sempre busca apenas produtos ativos
        OR: [
          { name: { contains: searchText, mode: "insensitive" } },
          { description: { contains: searchText, mode: "insensitive" } }
        ]
      };

      const products = await prisma.product.findMany({
        where,
        select: {
          id: true,
          name: true,
          description: true,
          status: true,
          embalagemSigla: true,
          createdAt: true,
          updatedAt: true,
          embalagem: { select: { sigla: true, name: true } },
          qtEmbalagem: { select: { id: true, quantity: true } },
          ProductPrice: {
            select: {
              id: true,
              price: true,
              brand: { select: { id: true, name: true } },
              color: { select: { id: true, name: true, hexCode: true } }
            }
          }
        }
      });

      return products;
    } catch (error) {
      throw new Error(`Erro ao buscar produtos por texto: ${error.message}`);
    }
  }

}

export default new ProductsService()