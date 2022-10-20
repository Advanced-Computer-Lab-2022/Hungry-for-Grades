import styles from './CopyButton.module.css';

import Button from '@components/buttons/button/Button';

function CopyButton() {
  function myFunction() {
    /* const copyText = document.getElementById('myInput');
		if(copyText){
		copyText.onselect();
		copyText.setSelectionRange(0, 99999);
		navigator.clipboard.writeText(copyText.value);

		const tooltip = document.getElementById('myTooltip');
		tooltip.innerHTML = 'Copied: ' + copyText.value;
 */
  }

  const tooltip = document.getElementById('myTooltip');
  /*   tooltip.innerHTML = 'Copied: ' + copyText.value;
   */ function outFunc() {
    if (tooltip) {
      tooltip.innerHTML = 'Copy to clipboard';
    }
  }

  return (
    <div>
      <p>
        Click on the button to copy the text from the text field. Try to paste
        the text (e.g. ctrl+v) afterwards in a different window, to see the
        effect.
      </p>

      <input id='myInput' type='text' value='Hello World' />

      <div className={styles.tooltip}>
        <Button
          backgroundColor={'primary-bg'}
          isDisabled={false}
          label={'Copy'}
          name={''}
          type={'button'}
          onClickFunc={myFunction}
          onMouseOutFunc={outFunc}
        >
          <span className={styles.tooltiptext} id='myTooltip'>
            Copy to clipboard
          </span>
          Copy text
        </Button>
      </div>
    </div>
  );
}

export default CopyButton;
