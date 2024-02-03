//Disable buttons without captcha verification
const authBtn = document.getElementById("authBtn");
const mintBtn = document.getElementById("mintBtn");
const transferBtn = document.getElementById("transferBtn");
const buyBtn = document.getElementById("buyBtn");
const submitBtn = document.getElementById("toggleButton");

authBtn.disabled = true;
mintBtn.disabled = true;
transferBtn.disabled = true;
buyBtn.disabled = true;

function toggleButton() {
  authBtn.disabled = false;
  mintBtn.disabled = false;
  transferBtn.disabled = false;
  buyBtn.disabled = false;
  submitBtn.style.display = "none"
}

// Check if the user completed the reCAPTCHA
function validateCaptcha(response) {
  if (response) {
    return true;
  } else {
    alert('Please complete the reCAPTCHA.');
    return false;
  }
}

// Add event listener to the form
document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault();
  grecaptcha.execute();
});

// Initialize the reCAPTCHA widget
grecaptcha.ready(function() {
  grecaptcha.execute();
});

// Add callback function to handle the reCAPTCHA response
window.submitForm = function(response) {
  if (validateCaptcha(response)) {
    document.querySelector('form').submit();
  }
};


if (window.ethereum) {
  window.web3 = new Web3(window.ethereum)
  try {
      // ask user for permission
      ethereum.enable()
      // user approved permission
  } catch (error) {
      // user rejected permission
      console.log('user rejected permission')
  }
}
else if (window.web3) {
  window.web3 = new Web3(window.web3.currentProvider)
  // no need to ask for permission
}
else {
  window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
}
console.log (window.web3.currentProvider)

// contractAddress and abi are set after contract deploy
//TODO fill these when deployed on remix
var contractAddress = '0xcC75d26A05155e1cFBb41a22A57D3D684CEbc3c2';
var abi = JSON.parse('[ { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" } ], "name": "ApprovalForAll", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "uint256", "name": "newLicense", "type": "uint256" } ], "name": "ContractReturned", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "inputs": [ { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "customerAddress", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "authorizeLicense", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "toAdd", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "buyLicense", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "getApproved", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" } ], "name": "isApprovedForAll", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "mintLicense", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "newLicense", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "ownerOf", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "_data", "type": "bytes" } ], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" } ], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" } ], "name": "supportsInterface", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "tokenURI", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "fromAdd", "type": "address" }, { "internalType": "address", "name": "toAdd", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "transferLicense", "outputs": [], "stateMutability": "nonpayable", "type": "function" } ]');

//contract instance
var contract = new web3.eth.Contract(abi, contractAddress);

// Accounts
var account;

web3.eth.getAccounts(function(err, accounts) {
  if (err != null) {
    alert("Error retrieving accounts.");
    return;
  }
  if (accounts.length == 0) {
    alert("No account found! Make sure the Ethereum client is configured properly.");
    return;
  }
  account = accounts[0];
  console.log('Account: ' + account);
  web3.eth.defaultAccount = account;
});

//functions to perform interaction with smart contract
function authorizeLicense() {
  addressId = $("#authorizeAddressID").val();
  licenseId = $("#authorizeLicenseID").val();
  contract.methods.authorizeLicense(addressId, licenseId)
  .call((error, result) => {
    if (error) {
      console.log(`The result is: false`);
      console.error(error);
    } else {
      console.log(`The result is: ${result}`);
    }
  });
}

function mintLicense() {
  try{
    contract.methods.mintLicense()
    .send({from: account}, (error, licenseIdFromContract) => {
    if (error) {
      console.error(error);
    } else {
      console.log(`Txn Hash: ${licenseIdFromContract}`);
    }
  })
  .then(console.log);

  }
  catch(err) {
    console.log(err);
  }
  finally{
    contract.methods.newLicense().call()
    .then(value => console.log('License ID is',value))
    .catch(error => console.log(error));
  }
}

function transferLicense() {
  transferTo = $("#transferTo").val();
  transferFrom = $("#transferFrom").val();
  transferLicenseID = $("#transferLicenseID").val();
  contract.methods.transferLicense(transferFrom, transferTo,transferLicenseID).send({from: account}, (error, txHash) => {
    if (error) {
      console.log(`Transfer done.`);
    } else {
      console.log(`Transaction hash: ${txHash}`);
    }
  });
}

function buyLicense() {
  transferTo = account;
  buyLicenseID = $("#buyLicenseID").val();
  contract.methods.buyLicense( transferTo, buyLicenseID).send({from: account}, (error, txHash) => {
    if (error) {
      console.error(error);
    } else {
      console.log(`Transaction hash: ${txHash}`);
      console.log(`License successfully bought!`);
    }
  });
}

function genNew() {
  var newDiv = document.createElement("div");
  // Set a class name for the new div
  newDiv.className = "inputBox";
  // Set some inner HTML content for the new div
  newDiv.innerHTML = "<p>New div content</p>";
  // Append the new div to the container element
  var container = document.getElementById("buyRow");
  container.appendChild(newDiv);
}

let searchBtn = document.querySelector('#search-btn');
let searchBar = document.querySelector('.search-bar-container');
let formBtn = document.querySelector('#login-btn');
let signupBtn = document.querySelector('#signupBtn');
let loginForm = document.querySelector('.login-form-container');
let formClose = document.querySelector('#form-close');
let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');
let videoBtn = document.querySelectorAll('.vid-btn');

window.onscroll = () =>{
    searchBtn.classList.remove('fa-times');
    searchBar.classList.remove('active');
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
    loginForm.classList.remove('active');
}

menu.addEventListener('click', () =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
});

searchBtn.addEventListener('click', () =>{
    searchBtn.classList.toggle('fa-times');
    searchBar.classList.toggle('active');
});

formBtn.addEventListener('click', () =>{
    loginForm.classList.add('active');
});
signupBtn.addEventListener('click', () => {
  signUp.classList.add('signupp');
  signUp.classList.remove('signUp');
})
formClose.addEventListener('click', () =>{
    loginForm.classList.remove('active');
});

videoBtn.forEach(btn =>{
    btn.addEventListener('click', ()=>{
        document.querySelector('.controls .active').classList.remove('active');
        btn.classList.add('active');
        let src = btn.getAttribute('data-src');
        document.querySelector('#video-slider').src = src;
    });
});

var swiper = new Swiper(".review-slider", {
    spaceBetween: 20,
    loop:true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    breakpoints: {
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
    },
});

var swiper = new Swiper(".brand-slider", {
    spaceBetween: 20,
    loop:true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    breakpoints: {
        450: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        991: {
          slidesPerView: 4,
        },
        1200: {
          slidesPerView: 5,
        },
      },
});