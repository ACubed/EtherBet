pragma solidity ^0.5.1;

contract Bet {
    struct Team {
        string teamName;
    }

    enum GameOutcome {PENDING, HOME, AWAY, DRAW}

    struct Game {
        uint256 gameStart; //unix time
        Team home;
        Team away;
        GameOutcome outcome;
        bool exists;
    }

    struct Participant {
        address payable walletId;
        uint256 amount;
    }

    Game game;
    Participant[] homers;
    Participant[] awayers;
    uint256 pool;

    function setGame(
        uint256 _timestamp,
        string memory _homeTeam,
        string memory _awayTeam
    ) public {
        game = Game(
            _timestamp,
            Team(_homeTeam),
            Team(_awayTeam),
            GameOutcome.PENDING,
            true
        );
    }

    function setOutcome(uint8 _outcome) public {
        require(game.exists);
        require(game.outcome == GameOutcome.PENDING, 'Game already concluded');
        require(game.gameStart < block.timestamp, "Game hasn't started yet");

        game.outcome = GameOutcome(_outcome);
        payWinners();
        selfdestruct(msg.sender);
    }

    function payWinners() public {
        if (game.outcome == GameOutcome.HOME) {
            uint256 splitAmount = pool / homers.length;
            for (uint256 i = 0; i < homers.length; i++) {
                pay(homers[i].walletId, splitAmount);
            }
        } else if (game.outcome == GameOutcome.AWAY) {
            uint256 splitAmount = pool / awayers.length;
            for (uint256 i = 0; i < awayers.length; i++) {
                pay(awayers[i].walletId, splitAmount);
            }
        } else {
            for (uint256 i = 0; i < homers.length; i++) {
                pay(homers[i].walletId, homers[i].amount);
            }
            for (uint256 i = 0; i < awayers.length; i++) {
                pay(awayers[i].walletId, awayers[i].amount);
            }
        }
    }

    function pay(address payable winner, uint256 amt)
        public
        payable
        returns (bool)
    {
        require(
            address(this).balance >= amt,
            'Not enough funds to pay the winner'
        );
        winner.transfer(amt);
    }

    event Received(address, uint256);

    function betOnHome() external payable {
        require(game.exists, 'game does not exist');

        homers.push(Participant(msg.sender, msg.value));
        pool += msg.value;
        emit Received(msg.sender, msg.value);
    }

    function betOnAway() external payable {
        require(game.exists, 'game does not exist');
        awayers.push(Participant(msg.sender, msg.value));
        pool += msg.value;
        emit Received(msg.sender, msg.value);
    }
}
