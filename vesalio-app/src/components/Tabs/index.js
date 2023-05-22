import React from 'react'
import { Box, styled, Tab, Tabs } from '@mui/material';

const TabsWrapper = styled(Tabs)(
    ({ theme }) => `
      @media (max-width: ${theme.breakpoints.values.md}px) {
        .MuiTabs-scrollableX {
          overflow-x: auto !important;
        }
  
        .MuiTabs-indicator {
            box-shadow: none;
        }
      }
      `
);

export default function TabsGeneral({ tabs, setTabs }) {

    const handleTabsChange = (_event, tabsValue) => {
        setTabs(x => x.reduce((arr, item) => {
            arr.push({
                ...item,
                active: item.value === tabsValue && true
            })
            return arr
        }, []))
    };
    return (
        <>
            {
                tabs.length > 0 && <Box
                    display="flex"
                    alignItems="center"
                    flexDirection={{ xs: 'column', sm: 'row' }}
                    justifyContent={{ xs: 'center', sm: 'space-between' }}
                    pb={3}
                >
                    <TabsWrapper
                        onChange={handleTabsChange}
                        scrollButtons="auto"
                        textColor="secondary"
                        value={tabs.find(x => x.active).value}
                        variant="scrollable"
                    >
                        {tabs.map((tab) => (
                            <Tab key={tab.value} value={tab.value} label={tab.label} />
                        ))}
                    </TabsWrapper>
                    {/* <ToggleButtonGroup
                        sx={{
                            mt: { xs: 2, sm: 0 }
                        }}
                        value={toggleView}
                        exclusive
                        onChange={handleViewOrientation}
                    >
                        <ToggleButton disableRipple value="table_view">
                            <TableRowsTwoToneIcon />
                        </ToggleButton>
                        <ToggleButton disableRipple value="grid_view">
                            <GridViewTwoToneIcon />
                        </ToggleButton>
                    </ToggleButtonGroup> */}
                </Box>
            }
        </>

    )
}
