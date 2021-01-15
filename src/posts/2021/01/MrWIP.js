/** @jsx jsx */
import { jsx } from 'theme-ui'

export const MrJsx = () => {
  return (
    <div
      sx={{
        alignItems: 'center',
        backgroundColor: 'surface',
        display: 'grid',
        gridGap: 3,
        gridTemplateColumns: '80px auto',
        p: 3,
      }}
    >
      <img
        src="https://avatars2.githubusercontent.com/u/1465706?s=460&u=a3c1ce80b0ce24b68a66bfa59ca546d83f95877f&v=4"
        alt="Paul Scanlon"
        sx={{
          width: '100%',
          height: 'auto',
        }}
      />

      <div>
        <h3
          sx={{
            color: 'primary',
            m: 0,
          }}
        >
          Hello, I'm Mr Jsx
        </h3>
        <div>I'm a simple component with a heading, some text and a link</div>
        <div
          sx={{
            fontSize: 0,
          }}
        >
          Follow me on Twitter:{' '}
          <a
            href="https://twitter.com/PaulieScanlon"
            target="_blank"
            rel="noreferrer"
            sx={{
              color: 'secondary',
              fontSize: 'inherit',
            }}
          >
            @pauliescanlon
          </a>
        </div>
      </div>
    </div>
  )
}
