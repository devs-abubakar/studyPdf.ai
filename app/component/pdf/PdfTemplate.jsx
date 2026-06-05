import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer' 
import { PdfSchema } from '@/app/lib/pdf/pdf-schema'

const styles = StyleSheet.create({
    page: { padding: 40, fontFamily: 'Helvetica', backgroundColor: '#ffffff' },
    title: { fontSize: 26, marginBottom: 22, color: '#1a365d', fontWeight: 'bold' },
    moduleContainer: { marginBottom: 20 },
    heading: { fontSize: 18, color: '#2b6cb0', marginBottom: 12, borderBottomWidth: 1, borderBottomColor: '#e2e8f0', paddingBottom: 4 },
    conceptContainer: { marginBottom: 14 },
    subheading: { fontSize: 13, color: '#2d3748', fontWeight: 'bold', marginBottom: 6 },
    bulletPoint: { fontSize: 11, color: '#4a5568', paddingLeft: 12, marginBottom: 4, lineHeight: 1.4 },
    noteBox: { marginTop: 8, padding: 10, backgroundColor: '#fffaf0', borderLeftWidth: 4, borderLeftColor: '#dd6b20' },
    noteText: { fontSize: 10, color: '#dd6b20' }
})

export function PdfTemplate({data}){
    return (
        <Document>
            <Page size="A4" style={styles.page}>

                <Text style={styles.title}>{data.title}</Text>
                
                {data.modules.map((mod, mIdx) => (
                    <View key={mIdx} style={styles.moduleContainer}>
                        <Text style={styles.heading}>{mod.heading}</Text>
                        
                        {mod.concepts.map((concept, cIdx) => (
                            <View key={cIdx} style={styles.conceptContainer}>
                                <Text style={styles.subheading}>{concept.subheading}</Text>
                                
                                {concept.keyPoints?.map((point, pIdx) => (
                                    <Text key={pIdx} style={styles.bulletPoint}>
                                        • {point}
                                    </Text>
                                ))}
                                
                                {concept.importantNote && (
                                    <View style={styles.noteBox}>
                                        <Text style={styles.noteText}>
                                            Quick Review: {concept.importantNote}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        ))}
                    </View>
                ))}
            </Page>
        </Document>
    );
}