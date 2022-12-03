//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./LogHash.sol";

contract LogHashFactory {
    address[] deviceLogs;

    function createDeviceLog(
        string calldata _srcHash,
        string calldata _resultHash,
        string calldata _srcLink,
        string calldata _dataLink
    ) public returns (address) {
        LogHash deviceLog = new LogHash(
            _srcHash,
            _resultHash,
            _srcLink,
            _dataLink
        );
        deviceLogs.push(address(deviceLog));
        return address(deviceLog);
    }

    function getLastChildAddress () 
        public
        view
        returns (address)
    {
        uint lastIndex = deviceLogs.length-1;
        return deviceLogs[lastIndex];
    }

    function getDeployedChildContracts()
        public
        view
        returns (address[] memory)
    {
        return deviceLogs;
    }
}
