import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import SALE_ORDER_STATUS from '../../../../core/constant/sale-order-status';
import SaleOrderService from '../../../../services/sale-order.service';
const steps = [
    {
        status:SALE_ORDER_STATUS.PENDING,
        label: 'Khách vừa tạo đơn hàng',
        description: ''
    },
    {
        status:SALE_ORDER_STATUS.CONFIRM,
        label: 'Xác nhận hoặc từ chối đơn hàng ',
        description: `Xác nhận đơn hàng để xác định tiệm đã nhận đơn hàng và xử lý, nếu thấy điều gì không hợp lý có thể từ chối đơn hàng`
    },

];

const stepsConfirm = [
    {
        status:SALE_ORDER_STATUS.DELIVERING,
        label: 'Đóng gói và gửi đơn',
        description:
            'Sau khi xác nhận đơn hàng tiệm xác nhận đã đóng gói sản phẩm và giao cho đơn vị vận chuyển'
    },
    {
        status:SALE_ORDER_STATUS.COMPLETED,
        label: 'Hoàn thành',
        description: ``
    }
]
const UpdateStatusSaleOrder = ({ saleOrderFull, showStatus, closeUpdateStatus, saveComplete }) => {

    const state = useSelector(state => state.saleOrder);
    const [activeStep, setActiveStep] = React.useState(SALE_ORDER_STATUS.getNumber(saleOrderFull.status));
    const [canceled, setCanceled] = React.useState(saleOrderFull.status == SALE_ORDER_STATUS.CANCELED);


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleCancel = () => {
        setCanceled(true);
    };
    const handleActicve = () => {
        setCanceled(false);
    };

    const handleUpdatStatus = async () => {
        const dataRequest = {
            id: saleOrderFull._id,
            canceled,
            activeStep
        }
        console.log(dataRequest );
        const data = await SaleOrderService.updateStatus(dataRequest);
        if (data.result){
            saveComplete();
            closeUpdateStatus()

        }
    }



    return (
        <Dialog open={showStatus} onClose={closeUpdateStatus} maxWidth={'md'} >
            <Typography variant={'h3'} margin={2}>Trạng thái đơn hàng</Typography>

            <DialogContent>
                <Box sx={{ width: '400px' }}>
                    <Stepper activeStep={activeStep} orientation='vertical'>
                        {steps.map((step, index) => (
                            <Step key={step.label}>
                                <StepLabel
                                    optional={
                                        index === 2 ? (
                                            <Typography variant='caption'> Khi khách hàng đã nhận hàng sẽ chuyển sang trạng thái này</Typography>
                                        ) : null
                                    }
                                >
                                    {step.label}
                                </StepLabel>
                                <StepContent>
                                    <Typography>{step.description}</Typography>
                                    <Box sx={{ mb: 2 }}>
                                        <div>
                                            {index <2 ?  <Button
                                                variant={canceled ? 'outlined' : 'contained'}
                                                onClick={canceled ? handleActicve : handleNext}
                                                sx={{ mt: 1, mr: 1 }}
                                            >
                                                {!canceled ? 'Tiếp tục': 'Tiếp tục đơn hàng'}
                                            </Button> : ''}
                                            {!canceled ? <Button
                                                variant={!canceled ? 'outlined' : 'contained'}
                                                onClick={handleCancel}
                                                sx={{ mt: 1, mr: 1 }}
                                            >
                                                {index === 1 ? 'Từ chối' : 'Quay lại'}
                                            </Button> : ''}

                                        </div>
                                    </Box>
                                </StepContent>
                            </Step>
                        ))}
                        { !canceled ? stepsConfirm.map((step, index) => (
                            <Step key={step.label}>
                                <StepLabel
                                    optional={
                                        index === 1 ? (
                                            <Typography variant='caption'> Khi khách hàng đã nhận hàng sẽ chuyển sang trạng thái này</Typography>
                                        ) : null
                                    }
                                >
                                    {step.label}
                                </StepLabel>
                                <StepContent>
                                    <Typography>{step.description}</Typography>
                                    <Box sx={{ mb: 2 }}>
                                        <div>

                                            <Button
                                                variant={'outlined'}
                                                onClick={handleBack}
                                                sx={{ mt: 1, mr: 1 }}
                                            >
                                                {'Quay lại'}
                                            </Button>

                                        </div>
                                    </Box>
                                </StepContent>
                            </Step>
                        )) : ''}
                    </Stepper>

                </Box>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'space-between', marginTop: 2 }}>
                <Button onClick={closeUpdateStatus}>Hủy</Button>
                <Button variant={'contained'} onClick={handleUpdatStatus}>Lưu</Button>
            </DialogActions>
        </Dialog>

    );
};
export default UpdateStatusSaleOrder;
