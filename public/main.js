const trash = document.querySelectorAll('trash')

trash.forEach(trash => {
  trash.addEventListener('click', (e) => {
    console.log(e.targert)

    const trashId = e.target.dataset.id
    console.log(trashId)

    fetch('messages', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        trashId
      })
    }).then(function (response) {
      window.location.reload()
    })
  })
})
