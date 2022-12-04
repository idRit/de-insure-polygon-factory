//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract DriverIndexMapping {
    uint private seatbeltEngaged;
    uint private breakingIntensity;
    uint private averageSpeed;
    uint private nonIndicatedTurns;
    uint private mileage;
    uint private averageFuelConsumption;
    uint private driverScore;

    constructor(
        uint _seatbeltEngaged,
        uint _breakingIntensity,
        uint _averageSpeed,
        uint _nonIndicatedTurns,
        uint _mileage,
        uint _averageFuelConsumption
    ) {
        seatbeltEngaged = _seatbeltEngaged;
        breakingIntensity = _breakingIntensity;
        averageSpeed = _averageSpeed;
        nonIndicatedTurns = _nonIndicatedTurns;
        mileage = _mileage;
        averageFuelConsumption = _averageFuelConsumption;
    }

    function getSeatbeltEngaged() public view returns (uint) {
        return seatbeltEngaged;
    }

    function getBreakingIntensity() public view returns (uint) {
        return breakingIntensity;
    }

    function getAverageSpeed() public view returns (uint) {
        return averageSpeed;
    }

    function getNonIndicatedTurns() public view returns (uint) {
        return nonIndicatedTurns;
    }

    function getMileage() public view returns (uint) {
        return mileage;
    }

    function getAverageFuelConsumption() public view returns (uint) {
        return averageFuelConsumption;
    }

    function setSeatbeltEngaged(uint _seatbeltEngaged) public {
        seatbeltEngaged = _seatbeltEngaged;
    }

    function setBreakingIntensity(uint _breakingIntensity) public {
        breakingIntensity = _breakingIntensity;
    }

    function setAverageSpeed(uint _averageSpeed) public {
        averageSpeed = _averageSpeed;
    }

    function setNonIndicatedTurns(uint _nonIndicatedTurns) public {
        nonIndicatedTurns = _nonIndicatedTurns;
    }

    function setMileage(uint _mileage) public {
        mileage = _mileage;
    }

    function setAverageFuelConsumption(uint _averageFuelConsumption) public {
        averageFuelConsumption = _averageFuelConsumption;
    }

    function calculateDriverScore() public {
        driverScore = (seatbeltEngaged * 10) + (breakingIntensity * 10) + (averageSpeed * 10) + (nonIndicatedTurns * 10) + (mileage * 10) + (averageFuelConsumption * 10);
    }

    function getDriverScore() public view returns (uint) {
        return driverScore;
    }

    function getDriverIndex() public view returns (uint, uint, uint, uint, uint, uint, uint) {
        return (seatbeltEngaged, breakingIntensity, averageSpeed, nonIndicatedTurns, mileage, averageFuelConsumption, driverScore);
    }
}