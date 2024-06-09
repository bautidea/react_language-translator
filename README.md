# Language Translator

This app was developed using Cohere API, & React + TypeScript.

Its a simple app that takes advantage of LLM to perform a translation of any given sentence. Used LLM in this case was Cohere.

The app consist on two TextAreas, one serves as input and the other as output of the translation, Cohere takes the sentence and then, by explicitly indicating how the output should be, it return the translation.

Input language can be inferred by the LLM.

Also added the features of coping the translated text, as well as the option for the navigator to read out loud what's in on the Text Areas.

<div width='100%' align='center'>
<img src='./src/assets/translator_img.png' height='auto' width='100%' />
</div>

<br></br>
For Testing this app i've use <a href='https://vitest.dev/'>Vitest</a>, in this test i've simulated that a user would write in the input Text Area 'Hola mundo' and the translated output should be 'Hello world'.

<div width='100%' align='center'>
<img src='./src/assets/test_code.png' height='auto' width='100%' height='auto' />
</div>
