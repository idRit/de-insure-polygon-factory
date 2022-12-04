//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./DriverIndexMapping.sol";

contract LogHash {
    string private srcHash;
    string private resultHash;
    string private srcLink;
    string private dataLink;
    address private driverIndexAddress;

    constructor(string memory _srcHash, string memory _resultHash, string memory _srcLink, string memory _dataLink) {
        srcHash = _srcHash;
        resultHash = _resultHash;
        srcLink = _srcLink;
        dataLink = _dataLink;
    }

    function getSrcHash() public view returns (string memory) {
        return srcHash;
    }

    function getResultHash() public view returns (string memory) {
        return resultHash;
    }

    function getSrcLink() public view returns (string memory) {
        return srcLink;
    }

    function getDataLink() public view returns (string memory) {
        return dataLink;
    }

    function getLog() public view returns (string memory, string memory, string memory, string memory) {
        return (srcHash, resultHash, srcLink, dataLink);
    }

    function setDriverIndex(
        uint _seatbeltEngaged,
        uint _breakingIntensity,
        uint _averageSpeed,
        uint _nonIndicatedTurns,
        uint _mileage,
        uint _averageFuelConsumption
    ) public {
        DriverIndexMapping driverIndex = new DriverIndexMapping(
            _seatbeltEngaged,
            _breakingIntensity,
            _averageSpeed,
            _nonIndicatedTurns,
            _mileage,
            _averageFuelConsumption
        );
        driverIndexAddress = address(driverIndex);
    }

    function getDriverIndex() public view returns (address) {
        return driverIndexAddress;
    }
}