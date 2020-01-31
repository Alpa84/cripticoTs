import * as React from 'react'

function Explanation({}: {}) {
    return (
        <div className="Explanation">
            <h1>Welcome</h1>
            <p>
                To do aything with with a crypto coin you have to have a wallet. For that, you have to <b>generate a Key Pair</b>.
                Your public address is like an email address. If anyone wants to give you coin all they need to know is your public address.
                Your private key is like a password. You have to keep it secret. Anyone with your private key will be able to sell your coin.
                {/* Both keys have to be generated together, they are not independent. Actually you should generate them in a private manner, in your device. */}
                 With your key pair, choose an <b>alias</b> for your address and <b>generate a wallet</b>
            </p>
            <p>
                So, how do you get some sweet coin?
            </p>
            <p>
                The only way to have a coin is to generate one or having someone who has some transfer you some coin. Every coin out there had to be generated first.
            </p>
            <p>It will be easier having someone transfer you some. So, who has some? That information is in the <b>Blockchain</b></p>
            <p>The Blockchain has a list of all the coin generations and all coin transactions for anyone to see</p>
            <p> A generated coin is called a 'mined' coin, like when someone mines some gold and creates a gold coin with it. </p>
            <p>If user AlePan has mined one coin ( see <b>the first block</b> ) and has transfered 0.2 coins to Athena on <b>block 2</b>. How much does he has? </p>
            <p>That is how it is calculated. Instead of keeping track of how much everyone has, the blockchain stores all the transactions and mined coins</p>
            <p>So, this AlePan has some coin. If only you had his private key you could make a transaction to your address and steal it.</p>
            <p>Let's see the <b>wallets</b>. They have everybody's private keys! Private keys should not be shared with anyone you don't trust. We are only storing them here for showing you how it all works</p>
            <p>In fact, everthing about crypto coins is about trusting no one </p>
            <p>Lets make a transaction from AlePan to your public address.</p>
            <p>The first step is to publish the transaction</p>
            <p>Choose <b>giver</b> (AlePan), <b>receiver</b> (you), the <b>amount</b> to transfer (be careful to choose an amount of coin that AlePan does have, if you don't everybody will ignore the transaction because they know how much every address has).</p>
            <p>You also have to sign the transaction. To sign a transaction you have to know the giver's private key (which we do, hehe)</p>
            <p>Signing a transaction is producing a big number that is specific for that transaction and can only be produced by using the private key. Anyone can check that that number was produced by the one with that public address (who also has the private key)</p>
            <p>To illustrate that a signature is specific for a transaction, try the following. Change the amount , sign it again and watch the signature change</p>

            <p>Ok, are we done yet?</p>
            <p>Not yet. you have already signed the transaction, now you have to publish it. By publishing the transaction you are saying everyone that you want the transaction included in the blockchain</p>
            <p>How does is gets included?</p>
            <p>Enter Mining. a Miner takes all the published transactions that haven't already got in the chain and groups them in a block</p>
            <p>A block also has a funny little number called a hash</p>
            <p>How is a block hash made?</p>
            <p>You take the transactions data, the previous block hash and you produce a number that is unique for that block. go ahead and click <b>Edit Chain</b>, change the data of the block and watch the hash change as you change the data. For the moment, never mind the warnings you are going to see.</p>
            <p>All that the miner does is try to make that hash start with two zeros (or more). How? he just tries different numbers in a place specially meant for that, called the "nonce" untill the block hash starts with '00'</p>
            <p>You can try it yourself changing the nonce untill the hash starts with '00'. That is what mining is all about, blindly trying random numbers untill the hash starts with an established amount of zeros.</p>
            <p>Millions are spent trying to find this silly number for each new block. Why work so hard? the one who find this number get the privilege of creating a new coin for himself</p>
            <p>As you can see, the first transaction of every block is a 'mined' coin. No one gives it, it is created.</p>
            <p>Go ahead and click the <b>green button</b> and watch the miner grabbing the published transactions, packing them in a block and trying different numbers in the nonce untill the hash starts with '00'</p>
            <p>Did it happen too fast? Click it again to see generating a new coin. If there are no transactions to be included the miner will just generate a new block with his new coin.</p>
            <p>Once he finds the magic number, it tells everybody that he has a new block, and everybody adds that new block to the chain.</p>
            <p>That is it. That is what needs to happen for you to have some sweet coin.</p>
        </div>
    )
}

export default Explanation;
