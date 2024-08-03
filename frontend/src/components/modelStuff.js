import React from 'react';

const modelInitializer = (LayoutComponent) => {
    return class extends React.Component {
        state = {
            isLoading: true,
            items: [],
        };

        componentDidMount() {
            this.loadData();
        }
    
        loadData = async () => {
            this.setState(() => ({
                isLoading: true,
            }));
    
            try {
                
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
                    loadData={this.loadData}
                />
            )
        }
    }

}

const ModelDisplay = ({isLoading, items, loadData}) => {
    if(isLoading) {
        return <p>Model is being loaded.</p>
    }

    if(!items || items.length === 0){
        return (
            <p>
                No model data retrieved. Please try again. <button onClick={loadData}>Try again!</button>
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
            <tr>
                <td colSpan="2">
                    <button onClick={loadData}>Reload</button>
                </td>
            </tr>
        </table>
    )
}

const util = {
    modelInitializer,
    ModelDisplay
}

export default util;


