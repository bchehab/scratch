exports['default'] = {
  routes: api => {
    return {
      get: [
        {
          path:
            '/:apiVersion/businessDates/getBusinessDateWithDelay/:initialDate/:delay',
          action: 'calcTransferDate'
        },
        {
          path:
            '/:apiVersion/businessDates/getBusinessDateWithDelay/:initialDate/:delay/:timezone',
          action: 'calcTransferDate'
        },
        {
          path:
            '/:apiVersion/businessDates/getBusinessDateWithDelay/:initialDate/:delay/:timezone/:country',
          action: 'calcTransferDate'
        },
        {
          path:
            '/:apiVersion/businessDates/isBusinessDay/:date',
          action: 'checkIsBusinessDay'
        },
        {
          path:
            '/:apiVersion/businessDates/isBusinessDay/:date/:timezone',
          action: 'checkIsBusinessDay'
        },
        {
          path:
            '/:apiVersion/businessDates/isBusinessDay/:date/:timezone/:country',
          action: 'checkIsBusinessDay'
        }
      ],

      post: [
        {
          path: '/:apiVersion/businessDates/getBusinessDateWithDelay',
          action: 'calcTransferDate'
        },
        {
          path:
            '/:apiVersion/businessDates/isBusinessDay',
          action: 'checkIsBusinessDay'
        }
      ]
    }
  }
}
