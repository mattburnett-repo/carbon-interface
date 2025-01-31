import { jest } from '@jest/globals'

global.fetch = jest.fn((url: string) => {
  const response = {
    ok: true,
    json: () => {
      // For models endpoint, filter based on make_id in the URL
      if (typeof url === 'string' && url.includes('models')) {
        if (url.includes('honda')) {
          return Promise.resolve({
            'honda-civic': {
              data: {
                id: 'civic',
                type: 'vehicle_model',
                attributes: {
                  name: 'Civic',
                  make_id: 'honda',
                  year: 2023
                }
              }
            }
          })
        }
        return Promise.resolve({
          'toyota-camry': {
            data: {
              id: 'camry',
              type: 'vehicle_model',
              attributes: {
                name: 'Camry',
                make_id: 'toyota',
                year: 2023
              }
            }
          },
          'toyota-corolla': {
            data: {
              id: 'corolla',
              type: 'vehicle_model',
              attributes: {
                name: 'Corolla',
                make_id: 'toyota',
                year: 2023
              }
            }
          }
        })
      }
      
      // For makes endpoint
      return Promise.resolve({
        toyota: {
          data: {
            id: 'toyota',
            type: 'vehicle_make',
            attributes: {
              name: 'Toyota',
              slug: 'toyota'
            }
          }
        },
        honda: {
          data: {
            id: 'honda',
            type: 'vehicle_make',
            attributes: {
              name: 'Honda',
              slug: 'honda'
            }
          }
        }
      })
    }
  } as Response

  return Promise.resolve(response)
}) as jest.MockedFunction<typeof fetch> 