/* Copyright 2016 Canoo Engineering AG.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Emitter from 'emitter-component';
import { encode, decode } from './codec.es6';
import SockJS from '../bower_components/sockjs-client/dist/sockjs.min.js';


export default class SockJsTransmitter {

    constructor(url) {
        this.sockJsClient = new SockJS(url);
        this.sockJsClient.onopen = function() {
            console.log('SockJS open');
        };
        this.sockJsClient.onclose = function() {
            console.log('SockJS close');
        };
    }

    send(commands, onDone) {
        var that = this;
        this.sockJsClient.onmessage = function(e) {
            console.log('SockJS received message');
            const responseCommands = decode(e);
            onDone(responseCommands);
        };
        this.waitForSocketConnection(function(){
            console.log('SockJS sending....');
            that.sockJsClient.send(encode(commands));
        });



    }

    // Make the function wait until the connection is made...
    waitForSocketConnection(callback){
        var that = this;
        setTimeout(
            function () {
                if (that.sockJsClient.readyState === SockJS.OPEN) {
                    console.log("Connection is made");
                    if(callback != null){
                        callback();
                    }
                    return;

                } else {
                    console.log("wait for connection...");
                    that.waitForSocketConnection(callback);
                }

            }, 5); // wait 5 milisecond for the connection...
    }
    transmit(commands, onDone) {
        this.send(commands, onDone);
    }

    signal(command) {
        this.send([command], function() {
            console.log('Empty Callback for signal');
        });
    }

    static reset() {
        throw new Error('HttpTransmitter.reset() has been deprecated');
    }
}

Emitter(SockJsTransmitter.prototype);
