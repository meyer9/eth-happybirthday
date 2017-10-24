var Etherday = artifacts.require("./Etherday.sol");

contract('Etherday', function(accounts) {
  it("should allow owner to add a birthday wish for free", function() {
    return Etherday.deployed().then(function(instance) {
      return instance.wishBirthday("Wish you a happy birthday!", 0, {
        from: accounts[0]
      });
    }).then(function(id) {
      assert.notEqual(id, undefined)
    });
  });
  it("should not allow nonowner to add a birthday wish for free", function() {
    return Etherday.deployed().then(function(instance) {
      return instance.wishBirthday("Wish you a happy birthday!", 0, {
        from: accounts[1]
      });
    })
    .then(assert.fail)
    .catch(function(error) {
      assert.notEqual(error, undefined)
    });
  });
  it("should allow nonowner to add a birthday wish for 0.01 ETH", function() {
    return Etherday.deployed().then(function(instance) {
      return instance.wishBirthday("Wish you a happy birthday!", 0, {
        from: accounts[1],
        value: web3.toWei(0.01, "ether")
      });
    }).then(function(id) {
      assert.notEqual(id, undefined)
    });
  });
  it("should allow the owner to withdraw", function() {
    return Etherday.deployed().then(function(instance) {
      let balanceBefore = web3.eth.getBalance(accounts[0])
      return instance.wishBirthday("Wish you a happy birthday!", 0, {
        from: accounts[1],
        value: web3.toWei(0.01, "ether")
      }).then(() => {
        return instance.withdraw({
          from: accounts[0]
        })
      }).then(function(id) {
        let balance = web3.eth.getBalance(accounts[0])
        assert.equal(balance.minus(balanceBefore).greaterThan(web3.toWei(0.005, 'ether')), true)
        assert.notEqual(id, undefined)
      });
    })
  });
});
