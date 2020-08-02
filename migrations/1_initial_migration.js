const Migrations = artifacts.require('Bet');

module.exports = function (deployer) {
    deployer.deploy(Migrations);
};
