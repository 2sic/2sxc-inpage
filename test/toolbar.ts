import 'jasmine';
import { getSxcInstance } from '../src/x-bootstrap/sxc';
import { generateFallbackToolbar } from '../src/toolbar/build-toolbars';

describe('Toolbar test suite', function () {
  it('1 contains spec with an expectation', function () {
    expect(true).toBe(true);
  });

  it('2 generateFallbackToolbar', function () {
    var cBinstance = '2506';
    var cbId = '2506';
    let generatedHtml = generateFallbackToolbar()[0].outerHTML;
    console.log(
      'stv: html',
      generatedHtml);
    const expectedHtml = '<ul class="sc-menu" toolbar="" settings="{&quot;autoAddMore&quot;:&quot;end&quot;,&quot;hover&quot;:&quot;left&quot;,&quot;show&quot;:&quot;hover&quot;}"></ul>';
    expect(generatedHtml).toBe(expectedHtml);
  });

});

