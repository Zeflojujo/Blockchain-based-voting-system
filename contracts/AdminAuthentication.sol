//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./TimeControl.sol";

contract AdminAuthentication is TimeControl {

    struct Admin {
        string username;
        string password;
        bool isRegistered;
    }

    mapping(string => Admin) public admins;
    mapping(address => bool) public hasAdminLoggiedIn;
    constructor() {
        string memory username = "Admin";
        Admin memory admin = Admin("Admin", "admin123", true);
        admins[username] = admin;
    }

    function adminAuth(string memory _username, string memory _password) onlyAdmin public{
        require(admins[_username].isRegistered, "Please, Login with administrator ethereum account");
        // require(abi.encodePacked(_adminPublicAddress).length > 0 && keccak256(bytes(bytes(_password))).length > 0, "username and password cannot be empty");
        require(keccak256(bytes(_username)).length > 0 && keccak256(bytes(bytes(_password))).length > 0, "username and password cannot be empty");
        require(keccak256(bytes(admins[_username].username)) == keccak256(bytes(_username)), "Invalid public address");
        require(keccak256(bytes(admins[_username].password)) == keccak256(bytes(_password)), "Invalid password");
        hasAdminLoggiedIn[msg.sender] = true;
    }

    function adminLogout() public {
        hasAdminLoggiedIn[msg.sender] = false;
    }
}