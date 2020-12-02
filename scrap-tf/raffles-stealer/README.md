# Raffles Stealer

![Rafles-Stealer](https://github.com/Giglium/tf2-UserScript/workflows/raffles-stealer/badge.svg)

Slowly and gently enter in all [scrap.tf](https://scrap.tf/) raffles. The scope of this script isn't to enter in all the raffles in one time but one by one, simulating the same process that a human user will do, but whit less click and more fun. 

Is it useful to enter in all the raffles? During my testing, I have entered in ~3500 raffles and won only 24 times. I won 0,68% of the time is it worth the risk?  

> This script is not able to solve captcha so if you enter in the bot prevention page you need to manually solve the puzzle. The script will wait for you!

## Instruction
1. Ensure that you have a Script Manager installed;
2. Direct install from [Github](#) by [clicking here](./dist/raffles-stealer.user.js?raw=true);
3. Confirm that you want to install the script;
4. The script is ready to use.

## Changelog

* **Release 1.0.0 - 2020/11/23** - There was a lot of improvement:
  - Refactor some code that doesn't work anymore;
  - Minify the code for better performance;
  - *[BUG]* Fix an infinite loop on bot prevention pages and on won raffles;
  - *[BUG]* The user script is now able to go back from ended raffles.

* **Release 0.9   - 2017/11/19** - "Hello World!"
