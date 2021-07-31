import React, { Fragment, useEffect, useState } from 'react'
import { Grid, Box, Card, Text, Heading, Input, Button, Divider } from 'theme-ui'

import { MatterScene } from './MatterScene'

const currency = '£'

export const Checkout = () => {
  const [itemsInCart, setItemsInCart] = useState([
    {
      name: 'Product A',
      qty: 1,
      price: 1.01,
      total: 1.01,
    },
    {
      name: 'Product B',
      qty: 5,
      price: 0.99,
      total: 4.95,
    },
    {
      name: 'Product C',
      qty: 13,
      price: 1.12,
      total: 14.56,
    },
  ])

  const [cartTotal, setCartTotal] = useState(0)

  const handleChange = (event, name) => {
    let value = event.target.value
    setItemsInCart([
      ...itemsInCart.map((item) => {
        if (item.name === name) {
          return {
            ...item,
            qty: value,
            total: (item.price * value).toFixed(2),
          }
        }
        return item
      }),
    ])
  }

  useEffect(() => {
    setCartTotal(
      itemsInCart
        .reduce((totals, item) => {
          return totals + Number(item.total)
        }, 0)
        .toFixed(2),
    )
  }, [itemsInCart])

  return (
    <Box>
      <Grid
        sx={{
          gridTemplateColumns: ['auto', 'auto', 'auto 320px', 'auto 320px'],
        }}
      >
        <Card
          sx={{
            p: 3,
            gridRow: [3, 3, 1],
            ':hover': {
              transform: 'translateY(0)',
            },
          }}
        >
          <Heading as="div" variant="styles.h3" sx={{ textAlign: 'center', textTransform: 'uppercase' }}>
            Order
          </Heading>

          <Grid
            sx={{
              alignItems: 'center',
              gridTemplateColumns: 'auto 60px auto 60px',
            }}
          >
            <Text sx={{ fontWeight: 'bold' }}>Product Name</Text>
            <Text sx={{ textAlign: 'right', fontWeight: 'bold' }}>Qty</Text>
            <Text sx={{ textAlign: 'right', fontWeight: 'bold' }}>Price</Text>
            <Text sx={{ textAlign: 'right', fontWeight: 'bold' }}>Total</Text>
            {itemsInCart.map((item, index) => {
              const { name, qty, price, total } = item

              return (
                <Fragment key={index}>
                  <Text>{name}</Text>
                  <Text sx={{ textAlign: 'right' }}>
                    <Input type="number" min={0} max={99} value={qty} onChange={(event) => handleChange(event, name)} />
                  </Text>
                  <Text sx={{ textAlign: 'right' }}>{`${currency}${price}`}</Text>
                  <Text sx={{ textAlign: 'right' }}>{`${currency}${total}`}</Text>
                </Fragment>
              )
            })}
          </Grid>
        </Card>
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            flex: '1 1 auto',
            p: 3,
            gridRow: [2, 2, 1],

            ':hover': {
              transform: 'translateY(0)',
            },
          }}
        >
          <MatterScene particleTrigger={cartTotal} />

          <Heading as="div" variant="styles.h3" sx={{ textAlign: 'center', textTransform: 'uppercase' }}>
            Checkout
          </Heading>

          <Grid
            sx={{
              flex: '1 1 auto',
              gridTemplateColumns: '1fr auto',
            }}
          >
            <Text>SubTotal</Text>
            <Text sx={{ fontWeight: 'bold', textAlign: 'right' }}>{`${currency}${cartTotal}`}</Text>
            <Text>Discount</Text>
            <Text sx={{ fontWeight: 'bold', textAlign: 'right' }}>{`${currency}0`}</Text>
            <Heading as="div" variant="styles.h4">
              Total
            </Heading>
            <Heading
              as="div"
              variant="styles.h4"
              sx={{ fontWeight: 'bold', textAlign: 'right' }}
            >{`${currency}${cartTotal}`}</Heading>
          </Grid>

          <Button
            sx={{
              display: 'block',
              cursor: 'pointer',
              fontSize: '12px',
              textTransform: 'uppercase',
              width: '100%',
              zIndex: 997,
            }}
          >
            Checkout
          </Button>
        </Card>
      </Grid>
    </Box>
  )
}
