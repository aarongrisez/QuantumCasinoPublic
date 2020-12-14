import React, { Fragment } from 'react';

const AboutView = () => (
  <Fragment>

    <h1>Introducing the Bellgame</h1>

    <h2>The Game</h2>
    Like any game, there are things you can do (moves) and the condions for
    winning. Let's first talk about your "moves". We're giving you a box that
    which has a red button, a blue button, a cat, and a light.
    Ignore the cat for now (we're still working on training the cat to play the
    game when we tell it to.) The moves are simple: your light might be on or
    off. It doesn't matter if the light is on or off, you can choose to press
    either button. BUT, the light gives you a hint about whether you are
    choosing the correct button. 

    <h2>The Winning Part</h2>
    You win IF 
    <ul>
      <li>EXACTLY one person's light is on and you and your partner choose the same button or</li>
      <li>BOTH lights are on and you and your partner choose the opposite button</li>
    </ul>

    <h2>The Strategy</h2>
    So, you already know that most of the time, you and your partner want to choose the same button.
    In fact, that’s exactly what you should do. Let’s say you and your partner choose a really boring
    strategy before you start the game: you’re both always going to choose red. Then, because only one of the 
    lights will turn on 3 out of 4 times, you’re almost guaranteed to win 3 times out of 4.
    <br/>
    <br/>
    But remember the goal? It was to win <strong>more</strong> than 3 out of 4 times (or 6 out of 8,
    or 9 out of 12, etc, etc.). Is that even possible? Can you and your partner decide ahead of time 
    that you are going to use a strategy that will get you winning more than 6 times out of 8?
    <br/>
    <br/>

    <h2>SPOILERS LIE AHEAD</h2>

    The sad answer is, no. You can’t. At least in terms of classical statistics. Play this game many many many
    many many … many times and you’ll never beat the 75% win rate. Sure, you might get lucky, but that luck won’t last.

    <br/>
    <h2>But what does winning mean?</h2>
    A good question to ask is, “why should I care, especially if I’m not going to a casino based on quantum mechanics?”
    Turns out this little game is related to a very important result in quantum information.
    <br/>
    <br />
    I’m going to skip over a very lengthy mathematics interlude here, but for interested parties, I suggest these somewhat
    readable lecture notes or for the particularly daring, I suggest Chapter 2 Section 6 in Nielsen and Chuang’s textbook
    on Quantum Information.
    <br />
    <br/>
    An important word here is correlation. Roughly speaking, it’s a measure of how similarly two or more things behave.
    Say I saw a person and a dog on the street very far from me (so far that I wouldn’t be able to see a leash). If they’re
    moving together, it’s safe for me to say they’re probably connected in some way (like a leash). I can’t know for sure,
    but the evidence I have seems to suggest they are “correlated”.
    <br />
    <br/>
    This game tests your ability to correlate your choices with your partner’s choices. But...we didn’t let you talk to your
    partner during the game. So your choices aren’t actually correlated (like if there wasn’t a leash between the dog and the 
    person). The question is whether you can trick someone into thinking the measurements are correlated.
    <br />
    <br/>
    The person to trick might be a bit...tricky, also, and change the rules on you; that’s where the lights come in. See,
    it would be easy to fool someone if you and your partner chose a pattern before. You could alternate every turn. Or worse,
    you could choose the same button every single time.
    <br />
    <br/>
    The way these lights work, you don't know how to win (that is you don't have all the information) until after you can't talk
    to your partner. So this game is designed to make you lose, and statistically speaking, it will. Unless you harness the power
    of quantum mechanics. The important quantum results are these:
    <br/>
    <ul>
        <li>“Classical” (that is, non-quantum) theories have to obey this 75% rule</li>
        <li>“Quantum” theories can break this rule (and can even almost get to 85%)</li>
        <li>There are ways of securely sharing information between two
            computers if we accept these quantum descriptions</li>
    </ul>
    <br/>
    That last part might have piqued your interest. Yes, this all does come
    back down to technology, and there’s good reason to believe that quantum
    computers will play an important role in the future. And while that’s cool
    and important and many people have already written about it, personally,
    I’m just happy playing with this little game. If you are interested in
    another, similar game, I recommend checking out Adam Becker's interactive
    webpage <a href='https://freelanceastro.github.io/bell/'>here</a>. Just keep in mind that the house always wins!

  </Fragment>
);

export default AboutView;
