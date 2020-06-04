const MpesaOnline = require('mpesa-online')
const mpesa = new MpesaOnline()
const password = new Buffer.from('174379' + 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919' + timestamp).toString('base64')

// The params required to make a processRequest
const processRequestParams = {
  'BusinessShortCode': '174379',
  'TransactionType': 'CustomerPayBillOnline',
  'Amount': '1',
  'PartyA': '254725468798',
  'PartyB': '174379',
  'PhoneNumber': '254725468798',
  'CallBackURL': 'http://102.166.165.113/stk_callback',
  'AccountReference': '4002',
  'TransactionDesc': 'Testing mpesa online',
  'consumerKey': 'YMLlmQpGTWOYaQp0ubpnnfqJ6BdyJbZH',
  'consumerSecret': 'Mit7YOOLAjS5agT0',
  'passKey': password,
  'authenticationURL': 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
  'processRequestURL': 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
}
 
// Use processRequest to receive the USSD payment prompt(STK push) on your mobile device
mpesa.mpesaRequest(processRequestParams, 'processRequest')
  .then(response => {
    // If the response code is '0'(a success), query to check the status of the payment
    if (response.ResponseCode === '0') {
      poll(() => {
        const queryRequestParams = {
          'BusinessShortCode': '174379',
          'CheckoutRequestID': response.CheckoutRequestID,
          'consumerKey': 'YMLlmQpGTWOYaQp0ubpnnfqJ6BdyJbZH',
          'consumerSecret': 'Mit7YOOLAjS5agT0',
          'passKey': password,
          'authenticationURL': 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
          'queryRequestURL': 'https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query'
        }
        return mpesa.mpesaRequest(queryRequestParams, 'queryRequest')
          .then(response => response) // Anything resolved will be handled here
          .catch(error => error) // Anything rejected will be handled here
      }, 10000, 1000) // Let's query for the payment status every second for 10 seconds, to cater for any little delay in processing
        .then(response => console.log(response))
        .catch(error => {
          // An error occured, handle it
          console.log(error)
        })
    } else {
      // An error occured, handle it
      console.log(response)
    }
  })
  .catch(error => {
    // An error occured, handle it
    console.log(error)
  })
 
const poll = (fn, timeout, interval) => {
  const endTime = Number(new Date()) + (timeout)
  const query = (resolve, reject) => {
    fn()
      .then(result => {
        if (result.ResponseCode === '0') {
          // Payment successful
          resolve(result)
        } else if (Number(new Date()) < endTime && (result.errorCode === '500.001.1001' &&
          result.errorMessage === 'The transaction is being processed')) {
          // Payment pending, continue querying
          console.log('continue polling', result)
          setTimeout(query, interval, resolve, reject)
        } else if (Number(new Date()) > endTime) {
          // Configured timeout period has lapsed, handle it
          reject(result)
        } else {
          // An error occured, handle it
          reject(result)
        }
      })
      .catch(error => {
        // An error occured, handle it
        reject(error)
      })
  }
  return new Promise(query)
}


export default mpesa;