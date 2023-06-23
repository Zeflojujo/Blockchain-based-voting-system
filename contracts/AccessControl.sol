//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AccessControl {

    address public admin;
    // mapping(address => bool) internal authorized;

    constructor() {
        admin = msg.sender;
    }
    
    // modifier onlyAuthorized() {
    //     require(authorized[msg.sender] || msg.sender == admin, "Error: Unauthorized");
    //     _;
    // }

    // function addAuthorized(address _addr) public onlyAuthorized {
    //     authorized[_addr] = true;
    // }

    // function removeAuthorized(address _addr) public onlyAuthorized{
    //     authorized[_addr] = false;
    // }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    function transferAdmin(address newAdmin) public virtual onlyAdmin {
        admin = newAdmin;
    }

   
}