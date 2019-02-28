import React from 'react'
import Button from '@material-ui/core/Button'
import { Link, Route } from 'react-router-dom'
import styled from 'styled-components'
import { withTheme } from '@material-ui/core/styles';

const NavButton = (props: {
  label: string,
  to: string,
  activeOnlyWhenExact?: boolean,
  theme: any
}) => {
  const { label, to, activeOnlyWhenExact, theme } = props
  const StyledButton = styled(Button)`
    &&.active {
      font-size: 18px;
      font-weight: 600;
    }

    a {
      width: 100%;
      height: 100%;
      text-decoration: none;
      color: ${() => theme.palette.primary.main};

      &&:active {
        color: inherit;
      }
    }
  `

  return (
    <Route
      path={to}
      exact={activeOnlyWhenExact}
      children={({ match }) => {
        return (
          <StyledButton className={match ? "active" : ""}>
            <Link to={to}>{label}</Link>
          </StyledButton>
        )
      }}
    />
  )
}

export default withTheme()(NavButton)