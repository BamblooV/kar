// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Demo {
    string public data;

    function set(string calldata _data) external {
        data = _data;
    }

    function get() external view returns (string memory) {
        return data;
    }
}
