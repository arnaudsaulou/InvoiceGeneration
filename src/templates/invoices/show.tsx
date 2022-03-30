import * as React from 'React'
import { Invoice } from "../../schemas/types/invoice";
import { ItemInvoice } from '../../schemas/types/item-invoice';
import * as fs from 'fs'


function GlobalHeader(props: { invoice: Invoice }) {
    return (
        <header>
            <h1>Invoice</h1>
            <address>
                <p>{props.invoice.customer.name}</p>
                <p>{props.invoice.customer.address.street} <br />
                    {props.invoice.customer.address.city} &nbsp;
                    {props.invoice.customer.address.zipcode} &nbsp;
                    {props.invoice.customer.address.country}</p>
                <p>{props.invoice.customer.address.additional}</p>
            </address>
            <span>
                <img alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWsAAACLCAMAAACQq0h8AAABNVBMVEX///8TfMCysdlAU3Rrjsjm9P3J1OhUaI3///2amMr//v9ZgMEAc70AeL8AcbxppNLp8/jZ5/J6qdPI2uunw+Gqsb69vt48jsozSW2BsNcAeL4QfL5DVXi4t9uGpte/xs5indCrqdUyRXBLXoi1xdTz+vzW3uzu6e749fjCrMYAccG6mcBrjsXOutHq4+vbzd3Ao8KITo2qg6+FRo5fh8RSfcAvh8bYx9rq3+uTW5Wxjra9nsGZa56QYJbKtcvfzuGitdSRqtC5yuNzmMZBjb+wzeEAccWWwdmwwdxXf754rs6autqer9Ssz9+Yvt9liM1LesOGqNh2mdSWn61daoTT2N1to9d6hZnX3PAVfbXT7fdHWndufp6BlK+FuNnLy+JzLHqFUouKQJGVa5ePZ5Omea2liKn5N8RoAAAVLklEQVR4nO2dCUPbRhbHR1wZhCQbi8RYItSQChkDNnYcYxtMjuLS0MS0OZprF5Z26ff/CPtmRvctYxmn63+bBKwZafTT05s3pxGaaaaZZppppplmmmmmUGGEefIX/DdTxsIYo513Lyoz1tkLo/zLy4XWwqsZ62wFRs3/0motgC5/2gFvMgOemTBa2r/cJ6j39xcuXy7OHEkmwuT/nZ9aCxQ1Vav1QpvRzkIYaS9bC25dLryileVM4xU2HLVD4EhaxG3fd9H+QcKYOmovadOTvMyjmWmPTRDnbfqM2um2Z6zHIojykPYiFDSjvbBEU066ZJj8idRkSzQGvWpdRqIGreyvTr5cPPzB+Qjx+DuruXf2nXFeiEi0nZ/4Xa2W2lUpSkp5oH0nrKGYeV+cF0b7svWLRoPwCZUNy2dVkYuTIA6+j+Yt1l5cxpq0BXufuO2JvbK4JAmxpEHqz+d4ym2bxXkLrcSoiR+BaHt1MoaNcVmMN2oihZNkzE+iTCOLR5g0yNOqtfJmMtF2ORlpIvEMTTdrnNhRu217v8Xcdsb6VUqMGnx2PvPyjCwSmEKDPM59QAN9IShCae0vZVtHQtNKSW7WwHotu7LcUUAaHHWSOK/1Otj2VzZXs/UjF5KShvWvWZblblrdTOQ+COvXzwKSwlNaeaFlVz6MBVFlGBVOiZc0nFhwlC411t7EthIt1itEgQdbl79k10aWTW+tCEo5F6vy22xZO7oE0t3xj+GdTCGsg2lD22Ynq5sbmt5a/PI1tksEZ97AsgGnsy6M/N3UsawD3PY+1JCZ3WLBZC3I8aSz74LCSJAEqmo7TT4enMjL+BjEzRrkpr2fbT9rwWwxCpPvgwkQRlZNXUyVj0y0SVY5uli7HclKtuMHll1LUxE5Y8SNxJplxnQUJsa4PaztiIRMZ8hUNusMo53kslmLufQGRhszcd1OHtavDUdyufAjHWDIUFPLWvo1NWt4/XmUf7kSbdl+1q+hkqTzGNIGPyk1tayFEUdMwG1Hdz55WFM/8tv+JDr6ppW1WBzRxIhxkrZ6ctbQiHyxtLSTfafatLKW5LvYGbjt0DrS60OePXu5RCRDcMD/P/rr6tUdz5N/4zftnzYDWP/2bmlniWkn41BsKlkr1eFdT4MxuG23ZW/+7mP9+tnCL/KSrZ1MJ/pNF2sI2gRoOObG0LcJZ1hqObpYN3//fdPDGtzHmyWPsgyxp4w1wmuDr9o4Ii/e1UnybpPKxdp01G5l2HyeLtbGOH2C28WVRLGwMSS2uelh/fr1yrN3r+Qg1u7LhF6EdcSl6j1ysA5N78hBV/eEpAooVoLyBNT85Eza6mo0yofvkxgHRNvvCOnfvax/W1gLAO1jjXauw86M5WEhvPO5MJR9LSOLtRia7cKZA8ulM7HqnbZTFdrlNf/YKNbkYURneOE8xC9rwzNJ4qIpPtze+IHRjBA5qA1emqg3mUNprTx77XPUPtZkppf+aOtR0EnBFq44SVTEMMERQS3l3aUr2KONYdkUR5+yXJREkVM5j1RVEQVx6Jqpg1G+IAhKZHmk9lDzL4N7qwqcqMb0PT1cn1//8DHGkQCTxcX84to7l12vPNu04rxw1pD3em5uzs+aHBooQvwwrSieu+6tEJtFtQwM4z+qqo+zKaCdc9w5xsNq/AwfRVIHbjeC0bBKD8Wz3ljf/hQdEgNpqq9vbNat1k+vwkC7fMjnua3HQazhJksJ5x4IuZSsi2Z6rRidWBFKjhKVhQSDxqoqSu5mC5YFhc4NimcNWt9+z4e4EUCSXzSVl6nTXqArClYjUFPWxNPqj7fm5gLtmseFRNPEiKSy482LZy2cY+MSMaiJlZoVGo5PbEm8cHmCtvGIErEG257/IRi1ZdQG7Vckvm6RlTKf41lXHjHSgT7kvBr6cnv1Rbqw8yVgvYgZvQRPU8mZ0UjyR68KwsBhmrJ5I8lYz29Qt+2ybRr9uEkvMrfNVoCF+mqTNX+9ZaL2scZoMfGtcQBXsvsr41iLSsG4j6/xPgqqSI1U3zw4gsSPXlRVyVEhlcy5QQlZE21/0l2Bqct9OLTK7juaNcaf5xzy2TW+SDOhhnPU8XGsFcNbY1QWE+ATVtkq++QehF6kYLM+Mz9MwXp+ff29y2n7jNqwbBzPumI66jC71tLMyQNTsg07krUiSjkjJsN5yU4ZPlfnZxmRwZHV5K8Zu07eRI2tB5qGNdAmbttoOgWTJkKxrK8fz7nls+s1m4MQvjSgyllznEpmbWSz9mUUpHbJfCYYD4yEcAahHC42vnFhsVYiyiNwZqQuDIzyYGzdSDrW8xvbJNoOtemErOeWt2JY45xJTBUGi6FrXt7alnSGvKylr770jkYmxDmml1Lb+aiFTLRZ1TavI36Rw8szEE3fLOaQ6apGZU3dNrwegY46IetHy8vxrDkTRHU1qiMkb7uaio+1rz+ETbow7bpsXoLEdeGNNdpy1KyaUc1HFAfJkmqBHQNr4rajrDqG9aOt5SSsrVe2Hd0/UDTvTdD8rKMyYlS0TDW+ey1vPhelHF0ey9O08ThYQ7T97ccRWb+ipONZI6txHjMimjNv5A6s1RSsuT+iZ1x8Ma8+JtZA+8m/5HDbZlmDWD9eXk7GGlvN4RjW5buzVpU0dp2LLA9WzYTjY/3gyZN/r4Y5bZbVz/rR8vI/n7VZnvZY/DVl/QBoP0zF+npredys4dD0sh6fXRM9+RDsttk1XKxliPOWx86ad8ZiJtn7ZI01u043+6zGwxpo/0sOcCQGBj3IUadnHVHvY0eTR/W1ZTJiHZnO6vvgiuNmDbQD3LZ5Ed7sVn207FVy1u21CJUtMxID2jKZsC5GFGdYNMNw1WrHjpH1gycPfG7bvh9tx4qoR2XNCeFjTqI1piIqw8nYNaQWwkojOMYSJNlYozpO1oS2HMIarpZfCiCdhrUS1Rdn3duXan4ydh0lu6SqomqZsH7w5McQ1vRSd2SdTI555PfH2pYiWFPKJskaPw6CPW7WSn6qWFtRyCRZgxN9PDfnpz1e1qrkGLqeAtaiYE8TmTRrP+3xsq6eO4bn7p+1qMj4Hll7aY+NtaKAc3zrnA52r6xJYCSqzj7a+2A9N5cNa7Fads9euV+7FoVqwTUr9X5YO007TXwdKfXC29GfNeuo0kjCl1KeLt66b9YO2inajXKEVheRTxm3G8s7UeUhUT7PT4FdOxzJePpDApV5f0i68mTL2uk+fawN0x5T31NQn9u99qkGXSdD1q5Jy37WjPbYxgr8+r9hnfcsOwpiTWh/t6zFqWGteaezBrP2yz+26x37T6xsWJudt9Ni12zyqftKo7K2O83SbjKXBWt7vEU8S1mcbFhrnmiHXmlE1tie91FA6ZSJXSN74tp5kkI4ViNkwDp4Cd/IrEumIalCsVCKU0HOuO8Jndmwz2KLUyrkM+wPyYesmxuZtVw1S2is+lHM1T++5UAgac2+eDasz63d0USOXtRZHsVTHqUqZ8fa56etOxqVNRbNWS1q+OIhS8LAzpoJa5yXOGs2Z3zfSNVeyjhm1uvB6zsYsxFZo0E14l58rOVs+/kwwhdJJsabkvIZsd7IgjW2a8ck96Zl7EMw0pQ0Xdg4E9Yb8/Pb42cNWlQUNdm6CVUsO/Jl46/J6hqVS1YeTnTs0To+1hvkt2xY41Uu4b2J0ldHvoxYYzxIujBNER1XHhfrbxR1NqzBRa62FeIkY4CrnOTaVjkj1tB0kBWJLBWN9CWkvJLsus44WD8xf8vGrknmK0GIqfUVTlIGrnAzKx9CWo+FalWMCYuU6hfXtvzJ952MYG3/lhlruLu1oiRGjYRUz84191dp5KrGoZ8jV3Zj1JbM0ZRkrOmakat2VQorCz3X2YB375mBrUMx+6l+nA+G/eDb/FhZf44oQ341XAF7vtjJY8jZZ0m11xcOKIZdnoCGRvIOlPfrwbTHyHrruhJentivmopKH3FfUeeIUrrSeHLEnBrlP21vZMl667GOfGtQWMnod1KTATyPoKKC/4hc5cdGTsQOusYsyG/unnW6HBdS8am2wSRpfeVx6K4bO338EE37Lqy3wH0EFI9nmQP3ATI+9q+To0mto/487k/oskUjSyIMkxAU5YcQt3131tchdyqXcmfFdruYG/pqOGi/l9vtgL3vtatCGfK0zwoDbwiiFf7I5VxnAsyDHLlCueS/xL2Kf78dTntU1ltbjyph+SSBxbGKUL1wmyRGV1VRUQJ2F1yrGnlEQXTHgUiTRMeSdao8R8bZFJK6hKZHpNz5T6GV5Iistx53Ql9fOt5Iuieh8VD17ButGd9pUvUa7xqFR3mrVdn1gDRBUdz79PKqYC35nzLWULd8/LC+MR/kuEdiHeKozXyATSwMhyVVEFXPrq+yInLFosIJsifTGtBrl0oF2q/fdtu1j/VbaHGLZ6VCrnzWvuP+m5noYbDbHon1dZj7YPmANdm5A2ttURHd+yddiZx4fg7wvIiAtVIk1zyHByW6nLCfNX0wLM5JO3o8CWGkBUbb6VlvPdKja3/KmrqBK0V0dePR4ShhdbXK+fZgI/iKdLsNzruzdxBrsP48CSvTxdcTFLhtnxuJYI2CWG/N1eJMibEmEK7AiTjWufH0674ETQO3LGruuBxYi4y1QoZGnIf8rFfJTi3wakwraPq2ffy2fSfW4KjdMzkDs1EfgqkP4QSHDyEbL1FPQaxbdoMyfAjCxMuIrprTzxrlSO0rfDmfXtiEkddtp2N9zb6yIPoyhLWSuyrlIBCx920jB3BJEIUrjErAs+RjDU6kXBQFBYKXmDgE4QIdQhTUwfTSBhG3vTESa+Kokwiz8I04Cs4VktGuUGLQskSM2M+arsNTfz7TYuIQyCq3BbLMVopeinu/AjvQP22PxHonYaXP5vNB6As2OnS+BXQGkpi7KJBNigTNz5ru8Cice16dINak5Uh6x1VpgKZZ0Gz/ZnWSJGZ9HbZ7pT8bYV0sl8ult+7ZmMRdszYIac3IHtYK1x4MycMYeK4TwJp9XhI4lUv1RV33oodm/JeM9RZE1IkdI60bvwZ1RJaYc2Hm6w68gbV6RqZMqWDx7lwhrOHkF+CmqlPtsSkCzegkScKa9pwm/xphI+bz989haDCKZTKPqyxa2xoaojEfpvtgCSX3tYJY0y4+NJTAiUxja8ar2oftRKy3tj6nnElrtWU8ykN1xjqRoDXjGVJk8TWbDwYvhfNQAOtSabg2kIdQ+YrT70OoZfzwbT0B6+u03wEWyvotNUMqSeVcI9YWa7KBi6etSViLbtaKIMD/oqiK1emuG01h4rajWCP0mPacpvWI0CyRZF8mGlYrRtv8TFQEV4S9pojgr8lMDqjw3I9BU1Xv93GJzOkD70SzfKdBGFU+RbOujdLh8KXNKUF7/5dVjmPbV+NziCDKTtMfcO12mT7/M64NhxzS2pzq7o3CV2dkE1CyQPJ78NaGohuB/EhdO8YIbfAwJHb8gn1HzQjeXaVqvjeLzIjQKlrw123MNNNMM1HZPmWmrMUbfzJWbMflFAtKXqn4GQV8hPgK+6MHIsXoQHfUfcGJAhQ5Que/CH9qZUh8ianR7k2j8bTuNZa9XX/KTh9SH6LK0+De2uOeNasK/v1PLeH1+53ERSWsm1bB+P8k6zWeHtUataCYL5B1F6FmB+GjQFPUD+1gD053EDFz0KVuGtaotmv7kIPvza7rXbowFejUD46Aj35AURLWuHJkYuVRpX5wegJWCB/DS4DrlaMDalaVOog4l6Mj+B3rHTgBmQRYJ6fsHNTJ9L56hcd6DeGOXn+OUecIPjXOCgmANV+HDB1mpfBv5wAeKNLJM6hXcAUuVefrBx0yU5CWCONarfOclAM+6RwcdUh54Iy1GpyRln9KXXq9T//hcfNkr9dBR0+Pmzc6Y/38Zu/4qeEK9G5vt3dCf6w8raDKn38d7xFfctQ4Pux2daw3esc3R+Czn94e3jYhFcl42D1snsB9N+DnU/iw120eoTrk6FGuPGqeHB7CQTgjRnuHxmdwpu4pzYBRQ0f605Pjk27vsAF0O429vUYd3FWjeYDwn3CW45PdQ/gEk7Ic7gFzkiLVmzJB1Rs9UI3YN3n3yRt9vMdY/3UA7+ktSwb3gWpdVpUCa9wAU+7tMg9Q62J0fAw+5gbYA1IeCBFKlT/B2AAKuqnBQ+hBBkCIdnvmpXGny1N/XSFnOzZZQ4bnYACQAUNOYA2FvGX5mnCCOjzxw0NSEnhCOnlKJ3VyBox2oYwnR5CyeR8gE6jeBR8AzoPcCry45K7J3QBrvluv6Ud95oXBIGndCCJkeJKO3DGQApvm0e2prnfgQ8KaPgBg3enqur53TFgDOmLXu3Aqvd8z/b2Z2Mdab1DWkFNnrE/YCUiJ6nDs8JgkhWcOD4UnrGl5gHXlpq6TMk+nmA/hqVF4WTebvd5xNOvd7u5hH/69/asJYqxxt8ZYN/6Gzw48rHGl1zhi1w5lXbNY12zW8Hu/2YMiYRdr5GLdJcU4nlZ/TX0HRqfk1jB9F03WfUdM9fdBMOsTeCmIe7yl+LCbddfIDD4EUx+yyxqXnQarBcA1YIO1w1/brA1/7WBdY1exWMMlXD6Elivr74UfWbU/K7S9VyNOFsoNjG93mb/u7dnJDv7iA1mfNnoHZMzt9Janp3Gy5kk1RmKFW6jIDk3WBHf3OTsTqUC7EEZAvcc3Pazr3QrSPT5kr0eTWKxx5eY5tWvUP0L831DeJjkyrXEI2m10u1Bz44NuHxjpJ/0GMShgjSvN7kmf1WSY73X7fVZPEtYVk3XztLPbJ89kD7L/13QLjDXUff2TLnE+JC+tGwHCaf+k32T94ugIDhAbP7rpn9zSiN5ijVHvpnvbddk1LVH3b5M1KcPz/skJeaT1G7gEfFq5hXIcTy1sHmowEgVXdPr+sb8r7G/dbraQn9ktVOj3h8Odk3hEN+IOlhazdjwPB+kqmkqFZuJ1esD4TLe/xQ8ysUUkuvHeY0w+4M2SgGcgZzN7B8wSVWhDiWbFeoXYNRwwzuAs8/TJ9QXR7jVI9oA871tZRD9o7kHTo09v2vjM/JGuLWIZ2RxVdtx9IqPDirev61wcavYzYeM1QP5k5OyUtT2cMdUDEtDCo7BoIXnTvigGmzw2UpHbNPdRJw253V7zUGcJ2GckF2/+auBy7KfiOFFQAvORsZ/M7hVaMMw7HLGZjJzgkLVdeGfqf6L+qfc1leKdb/39aPa8Z5pppplmmmkE/Q+34h45XjeUQgAAAABJRU5ErkJggg==" />
            </span>
        </header>
    );
}

function InvoiceHeader(props: { invoice: Invoice }) {
    return (<table className="meta">
        <tr>
            <th><span>Invoice #</span></th>
            <td><span >{props.invoice.reference}</span></td>
        </tr>
        <tr>
            <th><span >Date</span></th>
            <td><span >{props.invoice.date}</span></td>
        </tr>
        <tr>
            <th><span >Due within (days)</span></th>
            <td><span >{props.invoice.paymentDelayInDays}</span></td>
        </tr>
    </table>
    );
}

function IteamInvoiceHelper() {
    return (
        <thead>
            <tr>
                <th><span >Item</span></th>
                <th><span >Quantity</span></th>
                <th><span >Price</span></th>
                <th><span >Rate</span></th>
                <th><span >Total</span></th>
            </tr>
        </thead>
    );
}

function ItemInvoiceLine(props: { itemInvoice: ItemInvoice }) {
    return (
        <tbody>
            <tr>
                <td><span >{props.itemInvoice.description}</span></td>
                <td><span >{props.itemInvoice.quantity}</span></td>
                <td><span data-prefix>$</span><span>{props.itemInvoice.unitPriceWithoutTax}</span></td>
                <td><span >{props.itemInvoice.taxPercent}</span></td>
                <td><span data-prefix>$</span><span>{props.itemInvoice.quantity * props.itemInvoice.unitPriceWithoutTax}</span></td>
            </tr>
        </tbody>
    );
}

function InvoiceTotal(props: { total: Number, totalTaxes: Number, amountDue: Number }) {
    return (
        <table className="balance">
            <tr>
                <th><span >Total</span></th>
                <td><span data-prefix>$</span><span>{props.total}</span></td>
            </tr>
            <tr>
                <th><span >Tax</span></th>
                <td><span data-prefix>$</span><span >{props.totalTaxes}</span></td>
            </tr>
            <tr>
                <th><span >Amount Due</span></th>
                <td><span data-prefix>$</span><span>{props.amountDue}</span></td>
            </tr>
        </table>
    );
}


export async function showInvoice(invoice: Invoice) {

    const css = await fs.readFileSync('./src/styles/styles.css', 'utf-8')

    let total = 0
    let totalTaxes = 0
    let amountDue = 0

    invoice.itemInvoices.forEach(item => {
        let itemTotal = item.quantity * item.unitPriceWithoutTax
        let itemTaxe = item.quantity * (item.unitPriceWithoutTax * item.taxPercent / 100)

        total += itemTotal
        totalTaxes += itemTaxe
        amountDue += (itemTotal + itemTaxe)
    })

    return (
        <html>
            <head>
                <meta charSet="utf-8" />
                <title>Invoice</title>
                <style>
                    {css}
                </style>
            </head>

            <body>

                <GlobalHeader invoice={invoice} />

                <div className="clear"></div>

                <article>

                    <h1>Recipient</h1>
                    <address>
                        <p>EFREI</p>
                    </address>

                    <InvoiceHeader invoice={invoice} />

                    <div className="clear"></div>

                    <table className="inventory">

                        <IteamInvoiceHelper />

                        {invoice.itemInvoices.map((item, index) => {
                            <h1>numbers</h1>
                            return <ItemInvoiceLine key={index} itemInvoice={item} />
                        })}

                    </table>

                    <InvoiceTotal total={total} totalTaxes={totalTaxes} amountDue={amountDue} />

                    <div className="clear"></div>
                </article>

                <div className="clear"></div>

                <aside>
                    <h1><span >Additional Notes</span></h1>
                    <div >
                        <p>A finance charge of 1.5% will be made on unpaid balances after 30 days.</p>
                    </div>
                </aside>

            </body>
        </html>
    );

}
