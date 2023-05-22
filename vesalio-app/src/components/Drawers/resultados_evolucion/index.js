import { Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import TabsGeneral from 'src/components/Tabs'
import highcharts from 'highcharts'

export default function index() {
    const [tabs, setTabs] = useState([
        { value: '01', label: 'Tensión arterial', active: true },
        { value: '02', label: 'Altura', active: false },
        { value: '03', label: 'Peso', active: false },
        { value: '04', label: 'Temperatura', active: false }
    ])
    useEffect(()=>{
        highcharts.chart('container', {
            chart: {
                zoomType: 'xy'
            },
            title: {
                text: 'Presión arterial',
                align: 'left'
            },
            subtitle: {
                text: '',
                align: 'left'
            },
            xAxis: [{
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                crosshair: true
            }],
            yAxis: [ { // Secondary yAxis
                gridLineWidth: 0,
                title: {
                    text: '',
                    style: {
                        color: highcharts.getOptions().colors[0]
                    }
                },
                labels: {
                    format: '{value} mm',
                    style: {
                        color: highcharts.getOptions().colors[0]
                    }
                }
        
            }],
            tooltip: {
                shared: true
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                x: 80,
                verticalAlign: 'top',
                y: 55,
                floating: true,
                backgroundColor:
                    highcharts.defaultOptions.legend.backgroundColor || // theme
                    'rgba(255,255,255,0.25)'
            },
            series: [ {
                name: 'Sistólica',
                type: 'spline',
                data: [120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120],
                marker: {
                    enabled: false
                },
                dashStyle: 'shortdot',
                tooltip: {
                    valueSuffix: ' mm',
                    color: '#000000'
                }
        
            }, 
            {
                name: 'Diastolica',
                type: 'spline',
                data: [80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80],
                marker: {
                    enabled: false
                },
                dashStyle: 'shortdot',
                tooltip: {
                    valueSuffix: ' mm',
                    color: '#000000'
                }
        
            },        
            {
                name: 'Ritmo cardiaco',
                type: 'spline',
                data: [75, 90,75, 90,75, 90,75, 90,75, 90,75, 90],
                tooltip: {
                    valueSuffix: ' mm'
                }
            }],
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            floating: false,
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom',
                            x: 0,
                            y: 0
                        },
                        yAxis: [{
                            labels: {
                                align: 'right',
                                x: 0,
                                y: -6
                            },
                            showLastLabel: false
                        }, {
                            labels: {
                                align: 'left',
                                x: 0,
                                y: -6
                            },
                            showLastLabel: false
                        }, {
                            visible: false
                        }]
                    }
                }]
            }
        });
    },[])
    return (
        <Grid
            container
            direction="row"
            sx={{ px: 2, mt: 2 }}
            justifyContent="center"
            alignItems="stretch"
            spacing={1}
        >
            <Grid item xs={12} lg={12} md={12}>
                <TabsGeneral setTabs={setTabs} tabs={tabs} />
            </Grid>
            <Grid item xs={12} lg={12} md={12}>
                <Typography variant='h4'>{tabs.find(x => x.active).label}</Typography>
            </Grid>
            <div id="container" style={{height: 400}}>p</div>
        </Grid>
    )
}
