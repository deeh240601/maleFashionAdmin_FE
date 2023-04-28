export const SALE_ORDER_STATUS = {
    PENDING: 'PENDING',
    CONFIRM: 'CONFIRM',
    DELIVERING: 'DELIVERING',
    COMPLETED: 'COMPLETED',
    CANCELED: 'CANCELED',
    getNumber: (status) => {
        switch (status) {
            case 'PENDING':
                return 0;
            case 'CONFIRM':
                return 1;
            case 'DELIVERING':
                return 2;
            case 'COMPLETED':
                return 3;
            case 'CANCELED':
                return 1;
        }
    },
    getByNumber: (number) => {
        switch (number) {
            case 0:
                return 'PENDING';
            case 1:
                return 'CONFIRM';
            case 2:
                return 'DELIVERING';
            case 3:
                return 'COMPLETED';
            case 4:
                return 'CANCELED';
        }
    },
};

export default SALE_ORDER_STATUS
