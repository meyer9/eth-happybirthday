pragma solidity ^0.4.15;
// We have to specify what version of compiler this code will compile with

contract Etherday {

  struct BirthdayWish {
    string wish;
    uint32 imageID;
  }

  mapping (uint16 => BirthdayWish) public happyBirthdays;

  address owner;
  uint16 currentBirthdayID = 0;
  uint32 public largestWish;

  modifier onlyOwner {
    require(msg.sender == owner);
    _;
  }

  /*
  We set the owner at the start. The owner will get free birthday wishes.
  */
  function Etherday(address _owner, uint32 _largestWish) {
    owner = _owner;
    largestWish = _largestWish;
  }
  
  function getBirthdayWish(uint16 birthdayID) returns (string) {
    return happyBirthdays[birthdayID].wish;
  }
  
  function getBirthdayImage(uint16 birthdayID) returns (uint32) {
    return happyBirthdays[birthdayID].imageID;
  }

  function withdraw() onlyOwner {
    owner.transfer(this.balance);
  }

  function wishBirthday(string birthdayWish, uint32 imageID) payable returns (uint16) {
    uint256 cost = 0.01 ether;
    require(bytes(birthdayWish).length < largestWish);
    if (msg.sender == owner) {
      cost = 0;
    }
    require(msg.value >= cost);
    happyBirthdays[currentBirthdayID] = BirthdayWish(birthdayWish, imageID);
    currentBirthdayID++;
    return currentBirthdayID - 1;
  }
}