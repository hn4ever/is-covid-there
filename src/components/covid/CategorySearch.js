import FormControl from 'react-bootstrap/FormControl';
import Dropdown from 'react-bootstrap/Dropdown';

import 'bootstrap/dist/css/bootstrap.min.css';
import React,{ useState } from 'react';



// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
        href=""
        ref={ref}
        onClick={(e) => {
        e.preventDefault();
        onClick(e);
        }}
    >
        {children}
        &#x25bc;
    </a>
    ));

    // category data
    const categories = [
        'Cases_7_day_count_change',
        'deaths_7_day_count_change',
        'population_density_2019',
        'avg_hh_size',
        'percent_uninsured_2019',
        'poverty_rate_2019',
        'total_hospitals_reporting',
        'admissions_covid_confirmed_last_7_days',
        'admissions_covid_confirmed_last_7_days_per_100_beds',
        'percent_adult_inpatient_beds_used_confirmed_covid',
        'percent_adult_icu_beds_used_confirmed_covid',
        'percent_positive_14_day',
    ]

    const categoriesObj = {
        Cases_7_day_count_change: 'covid cases of 7 day count change',
        deaths_7_day_count_change: 'death cases of 7 day count change',
        population_density_2019: 'population density 2019',
        avg_hh_size: 'average household size',
        percent_uninsured_2019: 'precent of uninsured 2019',
        poverty_rate_2019: 'poverty rate 2019',
        total_hospitals_reporting: 'total reporting hospitals',
        admissions_covid_confirmed_last_7_days: 'covid addmissions confirmed last 7 days',
        admissions_covid_confirmed_last_7_days_per_100_beds: 'covid addmissions confirmed last 7 days per 100 beds',
        percent_adult_inpatient_beds_used_confirmed_covid: 'precent of inpatient beds used for confirmed COVID adults cases',
        percent_adult_icu_beds_used_confirmed_covid: 'precent of ICU beds used for confirmed COVID adults cases',
        percent_positive_14_day: 'precent of positive tests of 14 days',
    }
    // forwardRef again here!
    // Dropdown needs access to the DOM of the Menu to measure it
    const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
        const [value, setValue] = useState('');

        return (
        <div
            ref={ref}
            style={style}
            className={className}
            aria-labelledby={labeledBy}
        >
            <FormControl
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Type to filter..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
            />
            <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
                (child) =>
                !value || child.props.children.toLowerCase().startsWith(value),
            )}
            </ul>
        </div>
        );
    },
    );

    //callback that will show which state was picked
    // iterate and select a callback onClick and chose the state

    const CategorySearch = (props) => {

    return(
    <Dropdown>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        Select a Category <span></span>   
        </Dropdown.Toggle>
        {/* maybe here to fix the search? */}
        {/* <Dropdown.Menu as={CustomMenu}>
            {categories.map((category,i) => {
            return(
                <Dropdown.Item eventKey={i + 1} onClick={(event)=>{props.onFieldSelected(category)}} >{category}</Dropdown.Item>
            )
            })}
        </Dropdown.Menu> */}
                <Dropdown.Menu as={CustomMenu}>
            {Object.entries(categoriesObj).map(([key,value],i) => {
            return(
                <Dropdown.Item eventKey={i + 1} onClick={(event)=>{props.onFieldSelected(key)}} >{value}</Dropdown.Item>
            )
            })}
        </Dropdown.Menu>
    </Dropdown>
    
    )
    };

export default CategorySearch;