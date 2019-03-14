import React from 'react'
import Button from '@material-ui/core/Button'
import { Link, Route } from 'react-router-dom'
import styled from 'styled-components'
import { withTheme } from '@material-ui/styles';

const NavButton = (props: {
  label: string,
  to: string,
  activeOnlyWhenExact?: boolean,
  theme: any
}) => {
  const { label, to, activeOnlyWhenExact, theme } = props
  const StyledButton = styled(Button)`
    color: ${() => theme.palette.primary.main};
    &&.active {
      font-size: 18px;
      font-weight: 600;
    }
  `
  return (
    <Route
      path={to}
      exact={activeOnlyWhenExact}
      children={({ match, history }) => {
        return (
          <StyledButton onClick={() => history.push(to)} className={match ? "active" : ""}>
            {/* <Link to={to}>{label}</Link> */}
            {label}
          </StyledButton>
        )
      }}
    />
  )
}

export default withTheme()(NavButton)