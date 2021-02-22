console.log('Printing from client side on browser')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const searchString = search.value;
  messageOne.textContent = 'Loading Content ...'
  messageTwo.textContent = ''

  fetch(`http://localhost:3000/weather?address=${searchString}`).then(response => {
    response.json().then(data => {
        if (data.error) {
            messageOne.textContent = data.error
        } else {
        const {address, forecast, location} = data
        messageOne.textContent = location
        messageTwo.textContent =  forecast
        }
    })
})

})