/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'

export const MrStyledCard = () => {
  return (
    <div
      sx={{
        backgroundColor: 'surface',
      }}
    >
      <Styled.img
        src="https://placedog.net/600/350"
        alt="a dog - woof"
        sx={{ boxSizing: 'border-box', margin: 0, minWidth: 0, maxWidth: '100%', height: 'auto' }}
      />
      <div
        sx={{
          p: 3,
        }}
      >
        <Styled.h4>MrStyledCard</Styled.h4>
        <Styled.p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempus convallis imperdiet</Styled.p>
        <button
          sx={{
            appearance: 'none',
            backgroundColor: 'primary',
            border: 0,
            color: 'text',
            borderRadius: 0,
            cursor: 'pointer',
            fontSize: 1,
            lineHeight: 'inherit',
            minWidth: 120,
            margin: 0,
            textDecoration: 'none',
            px: 3,
            py: 2,
            ':focus': {
              outline: 'none',
              transition: '.2s linear box-shadow',
              boxShadow: (theme) => `0 0 0 2px ${theme.colors.muted}`,
            },
          }}
        >
          Click Me
        </button>
      </div>
    </div>
  )
}
