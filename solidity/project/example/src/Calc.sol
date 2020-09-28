pragma solidity ^0.4.0;

contract Calc {
    /*区块链存储*/
    uint256 count;

    /*执行会写入数据，所以需要`transaction`的方式执行。*/
    function add(uint256 a, uint256 b) returns (uint256) {
        count++;
        return a + b;
    }

    /*执行不会写入数据，所以允许`call`的方式执行。*/
    function getCount() constant returns (uint256) {
        return count;
    }
}


