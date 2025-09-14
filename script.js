  // Initialize admin user if not exists
  function initializeAdminUser() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if admin user already exists
    const adminExists = users.some(user => user.username === 'admin');
    
    // If admin doesn't exist, create it
    if (!adminExists) {
      users.push({
        name: 'Administrator',
        username: 'admin',
        email: 'admin@makassarcoding.com',
        password: 'admin' // In a real app, this should be hashed
      });
      
      localStorage.setItem('users', JSON.stringify(users));
      console.log('Admin user created');
    }
  }
  
  // Check if user is logged in
  function checkLoginStatus() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      // User is logged in
      console.log('User logged in:', currentUser.name);
      // You can update UI here to show user is logged in
    } else {
      // User is not logged in
      console.log('No user logged in');
    }
  }
  
  // Initialize on page load
  document.addEventListener('DOMContentLoaded', function() {
    initializeAdminUser();
    checkLoginStatus();
  });

  const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
  const appendAlert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>'
    ].join('')

    alertPlaceholder.append(wrapper)
  }

  const alertTrigger = document.getElementById('liveAlertBtn')
  if (alertTrigger) {
    alertTrigger.addEventListener('click', () => {
      appendAlert('Nice, you triggered this alert message!', 'success')
    })
  }