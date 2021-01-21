import React, { Fragment, useState } from 'react'
import { Grid, Flex, Box, Input, Label } from 'theme-ui'
import Downshift from 'downshift'

import { scales } from './scales'

export const ScaleExplorer = () => {
  const [selectedProperty, setSelectedPropery] = useState()

  return (
    <Grid>
      <Box
        sx={{
          position: 'relative',
        }}
      >
        <Downshift
          // defaultIsOpen
          onChange={(selection) => setSelectedPropery(selection.scale)}
          itemToString={(item) => (item ? item.property : '')}
        >
          {({
            getInputProps,
            getItemProps,
            getLabelProps,
            getMenuProps,
            isOpen,
            inputValue,
            highlightedIndex,
            selectedItem,
            getRootProps,
          }) => (
            <Box>
              <Label {...getLabelProps()}>Enter a CSS Property</Label>
              <Grid
                sx={{
                  gridTemplateColumns: ['1fr', '1fr auto 1fr'],
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                  }}
                >
                  <div {...getRootProps({}, { suppressRefError: true })}>
                    <Input {...getInputProps()} placeholder="e.g: padding" />
                  </div>
                  <Box
                    sx={{
                      position: 'absolute',
                      width: '100%',
                      maxHeight: 200,
                      overflow: 'scroll',
                      ul: {
                        backgroundColor: 'surface',
                        listStyle: 'none',
                        m: 0,
                        p: 0,
                        li: {
                          px: 3,
                          py: 1,
                        },
                        'li[aria-selected=true]': {
                          backgroundColor: 'secondary',
                        },
                      },
                    }}
                  >
                    <ul {...getMenuProps()}>
                      {isOpen
                        ? scales
                            .filter((item) => !inputValue || item.property.includes(inputValue))
                            .map((item, index) => (
                              <li
                                {...getItemProps({
                                  key: item.property,
                                  index,
                                  item,
                                })}
                              >
                                {item.property}
                              </li>
                            ))
                        : null}
                    </ul>
                  </Box>
                </Box>
                <Flex
                  sx={{
                    alignItems: 'center',
                    color: 'success',
                  }}
                >
                  {/* eslint-disable */}
                  <Box as="span" role="img" sx={{ display: ['none', 'block'] }}>
                    👉
                  </Box>
                  <Box as="span" role="img" sx={{ display: ['block', 'none'] }}>
                    👇
                  </Box>
                  {/* eslint-enable */}
                </Flex>
                <Flex
                  sx={{
                    alignItems: 'center',
                    backgroundColor: 'surface',
                    py: 2,
                    px: 3,
                    minHeight: 48,
                    span: {
                      lineHeight: 'normal',
                      fontFamily: 'code',
                    },
                  }}
                >
                  {selectedProperty ? (
                    <Fragment>
                      {' '}
                      <Box as="span" sx={{ color: 'placeholder' }}>
                        theme.
                      </Box>
                      <Box as="span" sx={{ color: 'primary' }}>
                        {selectedProperty}
                      </Box>
                    </Fragment>
                  ) : (
                    <Box as="span" sx={{ color: 'placeholder' }}>
                      ...
                    </Box>
                  )}
                </Flex>
              </Grid>
            </Box>
          )}
        </Downshift>
      </Box>
    </Grid>
  )
}
