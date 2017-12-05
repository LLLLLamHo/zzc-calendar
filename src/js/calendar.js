


export default function () {

    let calendarHTML = `
        <div class="picker-box">
            <div class="picker-content-box">
                <div class="picker-content picker-content-left">
                    <!-- 头部 -->
                    <div class="picker-header">
                        <div class="left-arrow arrow"></div>
                        <h5>2017-11</h5>
                    </div>
                    <!-- 主体 -->
                    <div class="picker-body">
                        <!-- 星期 -->
                        <div class="picker-week-box">
                            <table>
                                <thead>
                                    <tr>
                                        <th>日</th>
                                        <th>一</th>
                                        <th>二</th>
                                        <th>三</th>
                                        <th>四</th>
                                        <th>五</th>
                                        <th>六</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>1</td>
                                        <td>2</td>
                                        <td>3</td>
                                        <td>4</td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td>6</td>
                                        <td>7</td>
                                        <td>8</td>
                                        <td>9</td>
                                        <td>10</td>
                                        <td>11</td>
                                    </tr>
                                    <tr>
                                        <td>12</td>
                                        <td>13</td>
                                        <td>14</td>
                                        <td>15</td>
                                        <td>16</td>
                                        <td>17</td>
                                        <td>18</td>
                                    </tr>
                                    <tr>
                                        <td>19</td>
                                        <td>20</td>
                                        <td>21</td>
                                        <td>22</td>
                                        <td>23</td>
                                        <td>24</td>
                                        <td>25</td>
                                    </tr>
                                    <tr>
                                        <td>26</td>
                                        <td>27</td>
                                        <td>28</td>
                                        <td>29</td>
                                        <td>30</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
    
                </div>
                <div class="picker-content picker-content-right">
                    <!-- 头部 -->
                    <div class="picker-header">
                        <div class="right-arrow arrow"></div>
                        <h5>2017-12</h5>
                    </div>
                    <!-- 主体 -->
                    <div class="picker-body">
                        <!-- 星期 -->
                        <div class="picker-week-box">
                            <table>
                                <thead>
                                    <tr>
                                        <th>日</th>
                                        <th>一</th>
                                        <th>二</th>
                                        <th>三</th>
                                        <th>四</th>
                                        <th>五</th>
                                        <th>六</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>2</td>
                                        <td>3</td>
                                        <td>1</td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td>6</td>
                                        <td>7</td>
                                        <td>8</td>
                                        <td>9</td>
                                        <td>10</td>
                                        <td>11</td>
                                    </tr>
                                    <tr>
                                        <td>12</td>
                                        <td>13</td>
                                        <td>14</td>
                                        <td>15</td>
                                        <td>16</td>
                                        <td>17</td>
                                        <td>18</td>
                                    </tr>
                                    <tr>
                                        <td>19</td>
                                        <td>20</td>
                                        <td>21</td>
                                        <td>22</td>
                                        <td>23</td>
                                        <td>24</td>
                                        <td>25</td>
                                    </tr>
                                    <tr>
                                        <td>26</td>
                                        <td>27</td>
                                        <td>28</td>
                                        <td>29</td>
                                        <td>30</td>
                                        <td>12</td>
                                        <td>22</td>
                                    </tr>
                                    <tr>
                                        <td>31</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
    
                </div>
            </div>
            <div class="picker-tips">
                <p>
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAm1JREFUSA21Vj1s00AUvnd2nEqFCaaIoagDCGYWRiYQEh0Y6Z8qJgaQAnSAgXQoQwFLMDBV0JJ2ZAgSohNjF2ZADBEgoUww0FIpduw83nexjUPspKTE0ume7333vfPde9+ZVJ+Hry4ea3nBFDNfVESTirlk4EQNsetE9LpQtGu0uvItj4ayHLywWPL8YEmcs6x4W8hrFtP7tmU3gNdhUAqJT0uQKVJ0lpV6UXTse/RsxfjTnD0BmnPlSxRyVUBbjmXfofUH9fSEv22euz3ph8F9WcQF1mp6bN19lcZ0BWjOlK8T87JSNF/ccF+mgYNsb7p8WSleY6K7Y1X3SYxPAkQr3yRbn3PWHr2LAf/S+/M3z3DQfssWXYm/xATAnvt+66OsfCFv5Txza9wnvoGADtNjqj7cywpuvoTUc6dgn8SZaIBwoNJt5ZEbjApdbreX0TyxMZb1GA7mNxGnspGKfjOYlQM9lTXhzxgdlz2OXmHnP0gOPww/CPeSNnkuqTgoWyxWFdnCr2gdOz8AuJDe4LajIqrlwzuewoa7LdbEIFzil9oBt0aFoogSRx+Dr1UOofWBJC7DKdwa5R9XaOLNMEDs7/784u3sfN5PEMMp3CaLMvh6hlp7uyeY1RE56KOwewA5A9iiBrQlxz/0sOEEN1TRCNfQVNkTIzGsa0guVDEbdoBRKK1wa6PnkFxRxQPQdU0FF2Qc3BqXBfTcSG4XbPgXcIET3CaLcFkI3fmO5GYTF8YPfyJSP6SSv8PORomuQbblbog4FcXA/ch1nP/0tPIrnpfuc+U6Bo30wkmCjPLKjIOM9NKPg6D/H78tvwFLXGokZbzqrgAAAABJRU5ErkJggg=="/>
                    租期以天为单位，24小时为一天，不满24小时的按1天计算
                </p>
            </div>
        </div>`;
    
    return calendarHTML;
}