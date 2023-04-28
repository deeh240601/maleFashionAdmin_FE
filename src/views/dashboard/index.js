import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import EarningCard from './chart-components/EarningCard';
import PopularCard from './chart-components/PopularCard';
import TotalOrderLineChartCard from './chart-components/TotalOrderLineChartCard';
import TotalIncomeDarkCard from './chart-components/TotalIncomeDarkCard';
import TotalIncomeLightCard from './chart-components/TotalIncomeLightCard';
import TotalGrowthBarChart from './chart-components/TotalGrowthBarChart';
import { gridSpacing } from '../../core/constant/theme';
import BuyOrderService from 'services/buy-order.service';

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    const [totalBuyOrder, setTotalBuyOrder] = useState(0);
    const [totalOrder, setTotalOrder] = useState(0);
    useEffect(() => {
        setLoading(false);
        getTotalBuyOrder()
        getTotalOrder()
    }, []);


    const getTotalBuyOrder = async () => {
      const cc = await BuyOrderService.getTotalBuyOrder()
      setTotalBuyOrder(cc.result)
    }
    const getTotalOrder = async () => {
        const cc = await BuyOrderService.getTotalOrder()
        setTotalOrder(cc.result)
      }

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <EarningCard isLoading={isLoading} totalOrder={totalOrder} totalBuyOrder={totalBuyOrder}/>
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalOrderLineChartCard totalBuyOrder={totalBuyOrder} totalOrder={totalOrder} isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeDarkCard isLoading={isLoading} />
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeLightCard isLoading={isLoading} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={8}>
                        <TotalGrowthBarChart isLoading={isLoading} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <PopularCard isLoading={isLoading} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
