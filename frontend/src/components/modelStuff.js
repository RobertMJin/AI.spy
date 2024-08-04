import React from 'react';
import axios from 'axios';

const modelInitializer = (LayoutComponent) => {
    return class extends React.Component {
        state = {
            isLoading: true,
            items: [],
        };

        componentDidMount() {
            this.loadInitialModel();
        }
    
        reloadModel = async () => {
            this.setState(() => ({
                isLoading: true,
            }));
    
            try {

                const reloadModel = async () => {
                    try {
                      const response = await axios.post('http://localhost:5000/retrain'); //i think it was 5000?
                      console.log('Model retrained:', response.data);
                    } catch (error) {
                      console.error('Error initializing model:', error);
                    }
                  };
                
                //try to initialize model here
                //fetch request 
                //once response is gotten
                this.setState(() => ({
                    isLoading: false,
                    items: ['whats up']
                }))
            
            } catch (err) {
                this.setState(() => ({
                    isLoading: false
                }))
            }
    
        }

        loadInitialModel = async () => {
            this.setState(() => ({
                isLoading: true,
            }));
    
            try {

                const initializeModel = async () => {
                    try {
                      const response = await axios.post('http://localhost:5000/initialize'); //i think it was 5000?
                      console.log('Model initialized:', response.data);
                    } catch (error) {
                      console.error('Error initializing model:', error);
                    }
                  };
                
                //try to initialize model here
                //fetch request 
                //once response is gotten
                this.setState(() => ({
                    isLoading: false,
                    items: ['whats up']
                }))
            
            } catch (err) {
                this.setState(() => ({
                    isLoading: false
                }))
            }
    
        }
    
        render() {
            const { isLoading, items } = this.state;
            return (
                <LayoutComponent 
                    isLoading={isLoading}
                    items={items}
                    loadInitialModel={this.loadInitialModel}
                    reloadModel={this.reloadModel}
                />
            )
        }
    }

}

const ModelDisplay = ({isLoading, items, loadInitialModel, reloadModel}) => {
    if(isLoading) {
        return <p>Model is being loaded.</p>
    }

    if(!items || items.length === 0){
        return (
            <p>
                No model data retrieved. Please try again. <button onClick={loadInitialModel}>Try again!</button>
            </p>
        );
    }

    return (
        <table>
            {items.map(item => (
                <tr key={item.id}>
                    <td>
                        {item.name}
                    </td>
                </tr>
            ))}
            <button onClick={reloadModel}>Press to reload the model.</button>
        </table>
    )
}

const util = {
    modelInitializer,
    ModelDisplay
}

export default util;