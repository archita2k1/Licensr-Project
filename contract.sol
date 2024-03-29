// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/master/contracts/token/ERC721/IERC721.sol";
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/master/contracts/token/ERC721/IERC721Receiver.sol";
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/master/contracts/utils/math/SafeMath.sol";
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/master/contracts/utils/Address.sol";
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/master/contracts/utils/Counters.sol";
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/master/contracts/utils/introspection/ERC165.sol";
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/master/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/master/contracts/utils/Context.sol";
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/master/contracts/utils/Strings.sol";

contract Licensr is Context, ERC165, IERC721, IERC721Metadata {
    using Address for address;
    using Strings for uint256;
    
    uint256 tokenCounter;

    uint256 public newLicense;

    string private _name;

    string private _symbol;
    
    mapping (uint256 => address) private _owners;

    mapping (address => uint256) private _balances;

    mapping (uint256 => address) private _tokenApprovals;

    mapping (address => mapping (address => bool)) private _operatorApprovals;
    
    //initial values
    constructor () {
        _name = "Licensr";
        _symbol = "LIC";
        tokenCounter = 0;
    }

    //an ERC721 function to retrieve info of parameter passed
    //in our project we need ERC721 tokens 
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC165, IERC165) returns (bool) {
        return interfaceId == type(IERC721).interfaceId
            || interfaceId == type(IERC721Metadata).interfaceId
            || super.supportsInterface(interfaceId);
    }

    //returns tokens in account of owner
    function balanceOf(address owner) public view virtual override returns (uint256) {
        require(owner != address(0), "ERC721: balance query for the zero address");
        return _balances[owner];
    }

    //check the owner of a particular token
    function ownerOf(uint256 tokenId) public view virtual override returns (address) {
        address owner = _owners[tokenId];
        require(owner != address(0), "ERC721: owner query for nonexistent token");
        return owner;
    }
    
    //license authorization
    function authorizeLicense(address customerAddress, uint256 tokenId) public view returns(bool) {
        address authenticOwner = ownerOf(tokenId);
        if (customerAddress == authenticOwner) {
            return true;
        }
        return false;
    }

    function name() public view virtual override returns (string memory) {
        return _name;
    }

    function symbol() public view virtual override returns (string memory) {
        return _symbol;
    }

    //generate token URI
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0
            ? string(abi.encodePacked(baseURI, tokenId.toString()))
            : '';
    }

    function _baseURI() internal view virtual returns (string memory) {
        return "";
    }

//Gives permission to to to transfer tokenId token to another account. The approval is cleared when the token is transferred.
//Requirements - caller must own the token or be an approved caller and tokenId must exist
    function approve(address to, uint256 tokenId) public virtual override {
        address owner = Licensr.ownerOf(tokenId);
        require(to != owner, "ERC721: approval to current owner");

        require(_msgSender() == owner || isApprovedForAll(owner, _msgSender()),
            "ERC721: approve caller is not owner nor approved for all"
        );

        _approve(to, tokenId);
    }

    //returns account approved for transfer
    function getApproved(uint256 tokenId) public view virtual override returns (address) {
        require(_exists(tokenId), "ERC721: approved query for nonexistent token");

        return _tokenApprovals[tokenId];
    }

    //approve some other account to transfer on your behalf
    function setApprovalForAll(address operator, bool approved) public virtual override {
        require(operator != _msgSender(), "ERC721: approve to caller");

        _operatorApprovals[_msgSender()][operator] = approved;
        emit ApprovalForAll(_msgSender(), operator, approved);
    }


    function isApprovedForAll(address owner, address operator) public view virtual override returns (bool) {
        return _operatorApprovals[owner][operator];
    }


    function transferFrom(address from, address to, uint256 tokenId) public virtual override {
        //solhint-disable-next-line max-line-length
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved");

        _transfer(from, to, tokenId);

    }

    /*
        Safely transfers tokenId token from from to to, checking first that contract recipients are aware of the ERC721 protocol to prevent tokens from being forever locked.
            Requirements:
            from cannot be the zero address.
            to cannot be the zero address.
            tokenId token must exist and be owned by from.
            If the caller is not from, it must be have been allowed to move this token by either approve or setApprovalForAll.
            If to refers to a smart contract, it must implement IERC721Receiver.onERC721Received, which is called upon a safe transfer.
            Emits a Transfer event. 
    */
    function safeTransferFrom(address from, address to, uint256 tokenId) public virtual override {
        safeTransferFrom(from, to, tokenId, "");
    }

    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory _data) public virtual override {
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved");
        _safeTransfer(from, to, tokenId, _data);

    }

  
    function _safeTransfer(address from, address to, uint256 tokenId, bytes memory _data) internal virtual {
        _transfer(from, to, tokenId);
        require(_checkOnERC721Received(from, to, tokenId, _data), "ERC721: transfer to non ERC721Receiver implementer");

    }


    function _exists(uint256 tokenId) internal view virtual returns (bool) {
        return _owners[tokenId] != address(0);
    }


    function _isApprovedOrOwner(address spender, uint256 tokenId) internal view virtual returns (bool) {
        require(_exists(tokenId), "ERC721: operator query for nonexistent token");
        address owner = Licensr.ownerOf(tokenId);
        return (spender == owner || getApproved(tokenId) == spender || isApprovedForAll(owner, spender));
    }

    //Safely mints tokenId and transfers it to to.
    function _safeMint(address to, uint256 tokenId) internal virtual {
        _safeMint(to, tokenId, "");
    }

    // an additional data parameter which is forwarded in IERC721Receiver.onERC721Received to contract recipients.
    function _safeMint(address to, uint256 tokenId, bytes memory _data) internal virtual {
        _mint(to, tokenId);
        require(_checkOnERC721Received(address(0), to, tokenId, _data), "ERC721: transfer to non ERC721Receiver implementer");
    }

    //mint a new license
    function _mint(address to, uint256 tokenId) internal virtual {
        require(to != address(0), "ERC721: mint to the zero address");
        require(!_exists(tokenId), "ERC721: token already minted");

        _beforeTokenTransfer(address(0), to, tokenId);

        _balances[to] += 1;
        _owners[tokenId] = to;
        emit Transfer(address(0), to, tokenId);
    }

    //burn/delete a license token id
    function _burn(uint256 tokenId) internal virtual {
        address owner = Licensr.ownerOf(tokenId);

        _beforeTokenTransfer(owner, address(0), tokenId);

        // Clear approvals
        _approve(address(0), tokenId);

        _balances[owner] -= 1;
        delete _owners[tokenId];

        emit Transfer(owner, address(0), tokenId);
    }


    function _transfer(address from, address to, uint256 tokenId) internal virtual {
        require(Licensr.ownerOf(tokenId) == from, "ERC721: transfer of token that is not own");
        require(to != address(0), "ERC721: transfer to the zero address");

        _beforeTokenTransfer(from, to, tokenId);

        // Clear approvals from the previous owner
        _approve(address(0), tokenId);

        _balances[from] -= 1;
        _balances[to] += 1;
        _owners[tokenId] = to;

        
        emit Transfer(from, to, tokenId);
    }

 
    function _approve(address to, uint256 tokenId) internal virtual {
        _tokenApprovals[tokenId] = to;
        emit Approval(Licensr.ownerOf(tokenId), to, tokenId);
    }

    //Interface for any contract that wants to support safeTransfers from ERC721 asset contracts.
    //It must return its Solidity selector to confirm the token transfer. If any other value is returned or the interface 
    //is not implemented by the recipient, the transfer will be reverted.
    function _checkOnERC721Received(address from, address to, uint256 tokenId, bytes memory _data)
        private returns (bool)
    {
        if (to.isContract()) {
            try IERC721Receiver(to).onERC721Received(_msgSender(), from, tokenId, _data) returns (bytes4 retval) {
                return retval == IERC721Receiver(to).onERC721Received.selector;
            } catch (bytes memory reason) {
                if (reason.length == 0) {
                    revert("ERC721: transfer to non ERC721Receiver implementer");
                } else {
                    // solhint-disable-next-line no-inline-assembly
                    assembly {
                        revert(add(32, reason), mload(reason))
                    }
                }
            }
        } else {
            return true;
        }
    }

    /*
    Hook that is called before any token transfer. This includes minting and burning.
        Calling conditions:
        When from and to are both non-zero, from's tokenId will be transferred to to.
        When from is zero, tokenId will be minted for to.
        When to is zero, from's tokenId will be burned.
        from cannot be the zero address.
        to cannot be the zero address.
    */
    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal virtual { }
    
    //mint a new license
    function mintLicense() public returns(uint256) {
        newLicense = uint (keccak256(abi.encodePacked (msg.sender, block.timestamp, tokenCounter)));
        _safeMint(msg.sender, newLicense);
        tokenCounter = tokenCounter + 1;

        emit ContractReturned(newLicense);

        return newLicense;
    }
    
    function transferLicense(address fromAdd, address toAdd, uint256 tokenId) public {
        safeTransferFrom(fromAdd, toAdd, tokenId);
    }

    function buyLicense(address toAdd, uint256 tokenId) public {
        address fromAdd = Licensr.ownerOf(tokenId);
        safeTransferFrom(fromAdd, toAdd, tokenId);
    }
    
    event ContractReturned(uint256 newLicense);
}
