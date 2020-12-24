pragma solidity >=0.5.16;
pragma experimental ABIEncoderV2;

contract HelloWorld {
    string public message = "Hello World";
    MessageList[] public savedMessages;

    struct MessageList {

        address messenger;
        string message;
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
        savedMessages.push(MessageList( msg.sender, message));
       
    }

    function getMessage() public view returns(MessageList[] memory) {
        return savedMessages;
    }
}