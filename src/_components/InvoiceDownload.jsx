import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image, Font } from '@react-pdf/renderer';
import { FaFileInvoiceDollar } from 'react-icons/fa';
import facebookLogo from '../assets/facebook (1).png'
import email from '../assets/email.png'
import location from '../assets/placeholder.png'
// Register custom fonts
Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf', fontWeight: 300 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf', fontWeight: 400 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf', fontWeight: 500 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 700 },
  ],
});

// Define styles for PDF
const styles = StyleSheet.create({
  page: { 
    padding: 30,
    fontSize: 10,
    fontFamily: 'Roboto',
    backgroundColor: '#FFFFFF'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#3B82F6',
    paddingBottom: 10
  },
  logo: {
    width: 120,
    height: 50,
    objectFit: 'contain',
  },
  companyInfo: {
    textAlign: 'right'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginBottom: 10
  },
  addressSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    border: 1,
    borderColor: '#3B82F6',
    padding: 10,
  },
  addressBlock: {
    width: '48%',
   
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginBottom: 5
  },
  text: {
    fontSize: 10,
    marginBottom: 3
  },
  table: {
    display: 'table',
    width: 'auto',
    marginTop: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    borderRightWidth: 0,
    borderBottomWidth: 0
  },
  tableRow: {
    flexDirection: 'row'
  },
  tableHeader: {
    backgroundColor: '#f1f5f9'
  },
  tableCol: {
    width: '14.28%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCell: {
    margin: 5,
    fontSize: 10
  },
  totals: {
    marginTop: 20,
    alignItems: 'flex-end'
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 5
  },
  totalLabel: {
    width: 100,
    textAlign: 'right',
    paddingRight: 10
  },
  totalValue: {
    width: 100,
    textAlign: 'right',
    fontWeight: 'bold'
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    color: '#9ca3af',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 10
  },
  iconText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3
  },
  icon: {
    width: 12,
    height: 12,
    marginRight: 5
  },
  companyDetails: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginTop: 5,
    marginBottom: 5,
  },
  invoiceInfo: {
    alignItems: 'flex-end',
  },
  facebookPageLink: {
    color: '#3B82F6',
    textDecoration: 'underline',
    fontSize: 10
  }
});

const InvoicePDF = ({ order, reseller }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.companyDetails}>
          <Image 
            src={reseller?.logo || 'https://via.placeholder.com/150'} 
            style={styles.logo} 
          />
          <Text style={styles.companyName}>{reseller?.companyName || 'N/A'}</Text>
          <View style={styles.iconText}>
            <Image src={email} style={styles.icon} />
            <Text style={styles.text}>
            {reseller?.email || 'N/A'}</Text>
          </View>
          <View style={styles.iconText}>
            <Image src={location} style={styles.icon} />
            <Text style={styles.text}> {reseller?.address || 'N/A'}</Text>
          </View>
          <View style={styles.iconText}>
            <Image src={facebookLogo} style={styles.icon} />
            <Text style={styles.facebookPageLink}>{reseller?.facebookPageLink || 'N/A'}</Text>
          </View>
        </View>
        <View style={styles.invoiceInfo}>
          <Text style={styles.title}>Invoice</Text>
          <Text style={styles.text}>Invoice #: {order?.orderId}</Text>
          <Text style={styles.text}>Order Date: {new Date(order?.orderDate).toLocaleString()}</Text>
<Text style={styles.text}>
  Print at: {new Date().toLocaleString()}
</Text>
        </View>
      </View>

      {/* Address Section */}
      <View style={styles.addressSection}>
        <View style={styles.addressBlock}>
          <Text style={styles.sectionTitle}>From:</Text>
          <Text style={styles.text}>Name: {reseller?.name || 'N/A'}</Text>
          
          <Text style={styles.text}>Address: {reseller?.address || 'N/A'}</Text>
          <View style={styles.iconText}>
            
            <Text style={styles.text}>Phone: {reseller?.phone || 'N/A'}</Text>
          </View>
          <View style={styles.iconText}>
           
            <Text style={styles.text}>Email: {reseller?.email || 'N/A'}</Text>
          </View>
          <View style={styles.iconText}>
          
            <Text style={styles.text}>Website: {reseller?.website || 'N/A'}</Text>
          </View>
        </View>
        <View style={styles.addressBlock}>
          <Text style={styles.sectionTitle}>To:</Text>
          <Text style={styles.text}>Customer Name: {order?.customerName || 'N/A'}</Text>
          <View style={styles.iconText}>
            
            <Text style={styles.text}>Address: {order?.shippingAddress || 'N/A'}</Text>
          </View>
          <View style={styles.iconText}>
          
            <Text style={styles.text}>Phone: {order?.phoneNumber || 'N/A'}</Text>
          </View>
        </View>
      </View>

      {/* Payment & Shipping Method */}
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.sectionTitle}>Payment & Shipping Details</Text>
        <Text style={styles.text}>Payment Method: {order?.paymentMethod || 'N/A'}</Text>
        <Text style={styles.text}>Courier Service: {order?.courierService || 'N/A'}</Text>
      </View>

      {/* Items Table */}
      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <View style={styles.tableCol}><Text style={styles.tableCell}>Product</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>SKU</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>Price</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>Qty</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>Subtotal</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>Delivery Fee</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>Total</Text></View>
        </View>
        {order?.products?.map((product, index) => (
          <View style={styles.tableRow} key={index}>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{product?.productId?.name}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{product?.productId?.sku || 'N/A'}</Text></View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                ৳{product?.productId?.MainCashDiscountPrice || product?.productId?.Mainprice}
              </Text>
            </View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{product?.quantity}</Text></View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                ৳{(product?.productId?.MainCashDiscountPrice || product?.productId?.Mainprice) * product?.quantity}
              </Text>
            </View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{order?.shippingCharge}</Text></View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                 {(product?.productId?.MainCashDiscountPrice || product?.productId?.Mainprice) * product?.quantity || 'N/A'}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Totals */}
      <View style={styles.totals}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Subtotal:</Text>
          <Text style={styles.totalValue}> {order?.products?.reduce((total, product) => total + (product?.productId?.MainCashDiscountPrice * product?.quantity), 0)} Tk</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Delivery Charge:</Text>
          <Text style={styles.totalValue}>{order?.shippingCharge} Tk</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Grand Total:</Text>
          <Text style={styles.totalValue}> {order?.products?.reduce((total, product) => total + (product?.productId?.MainCashDiscountPrice * product?.quantity), 0) + order?.shippingCharge} Tk</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>Thank you for your business!</Text>
      </View>
    
    </Page>
  </Document>
);

const InvoiceDownload = ({ order, reseller }) => (
  <PDFDownloadLink 
    document={<InvoicePDF order={order} reseller={reseller} />} 
    fileName={`invoice-${order._id}.pdf`}
    className="bg-[#F45142] text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 mb-2 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md"
  >
    {({ blob, url, loading, error }) => 
      loading ? (
        <span className="flex items-center">
          
          Generating Invoice...
        </span>
      ) : (
        <>
          <FaFileInvoiceDollar className="text-xl" />
          Download Invoice
        </>
      )
    }
  </PDFDownloadLink>
);

export default InvoiceDownload;