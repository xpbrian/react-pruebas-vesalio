import { Card, CardActionArea, Switch, Typography, styled } from '@mui/material';
import React, { useEffect } from 'react'

const CardDevice = styled(Card)(
  ({ theme }) => `
        color: ${theme.colors.primary.main};
        width: 100%;
  
        &.active {
          background: ${theme.palette.primary.main};
          color: ${theme.palette.primary.contrastText};
          box-shadow: ${theme.colors.shadows.primary};
  
          .MuiCardActionArea-root {
            .MuiSvgIcon-root,
            .MuiSwitch-root .MuiSwitch-switchBase.Mui-checked,
            .MuiTypography-root,
            .MuiTypography-caption {
              color: ${theme.colors.alpha.white[100]};
            }
  
            .MuiSwitch-root .MuiSwitch-switchBase {
  
              .MuiSwitch-thumb {
                background-color: ${theme.colors.alpha.white[100]};
              }
  
              & + .MuiSwitch-track {
                background-color: ${theme.colors.alpha.white[30]};
              }
            }
  
  
          }
        }
  
        .MuiCardActionArea-root {
          padding: ${theme.spacing(3, 6, 3, 4)};
          height: 100%;
          align-items: flex-start;
          justify-content: center;
          display: flex;
          position: relative;
          flex-direction: column;
          border: transparent solid 1px;
          border-radius: inherit;
          transition: ${theme.transitions.create(['border', 'background'])};
  
          .MuiTypography-root {
            color: ${theme.colors.alpha.black[50]};
          }
  
          .MuiTypography-caption {
            color: ${theme.colors.alpha.black[100]};
          }
  
          .MuiSwitch-root {
            position: absolute;
            top: ${theme.spacing(2)};
            right: ${theme.spacing(2)};
          }
  
          &:hover {
            border-color: ${theme.colors.primary.main};
          }
        }
        
        .MuiTouchRipple-root {
          opacity: .1;
        }
  `
);

export default function HorasGeneradas({ item, horaSelected, setEventSelected }) {
  useEffect(() => {
    console.log(horaSelected.includes(item.id))
  }, [item])
  const changeEventSelected = (id, event) => {
    setEventSelected(id, event.target.checked)
  }
  return (
    <CardDevice className={horaSelected.includes(item.id) ? 'active' : ''}>
      <CardActionArea>
        <Switch edge="end" color="primary" checked={horaSelected.includes(item.id) && true} onChange={(e) => changeEventSelected(item.id, e)} />
        <Typography variant="h4" noWrap>
          {item.id.split('_')[1]}
        </Typography>
      </CardActionArea>
    </CardDevice>
  )
}
