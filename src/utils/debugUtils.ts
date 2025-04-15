
/**
 * Utility functions for debugging
 */

/**
 * Logs detailed information about Supabase database tables
 * @param tableName The name of the table to check
 */
export const debugTable = async (supabase: any, tableName: string) => {
  try {
    console.log(`--- DEBUG: Table ${tableName} ---`);
    
    // Get all rows from the table
    const { data, error } = await supabase
      .from(tableName)
      .select('*');
    
    if (error) {
      console.error(`Error querying ${tableName}:`, error);
      return;
    }
    
    console.log(`Total rows in ${tableName}: ${data?.length || 0}`);
    
    if (data && data.length > 0) {
      // Log the first row as an example of the structure
      console.log(`Sample row from ${tableName}:`, data[0]);
      
      // Log all rows to inspect the data
      console.log(`All rows in ${tableName}:`, data);
      
      // If the table has a status field, summarize status counts
      if (data[0].hasOwnProperty('status')) {
        const statusCount: Record<string, number> = {};
        data.forEach((row: any) => {
          const status = row.status || 'unknown';
          statusCount[status] = (statusCount[status] || 0) + 1;
        });
        console.log(`Status distribution in ${tableName}:`, statusCount);
      }
    } else {
      console.log(`No data found in ${tableName}`);
    }
    
    console.log(`--- END DEBUG: ${tableName} ---`);
  } catch (e) {
    console.error(`Error debugging ${tableName}:`, e);
  }
};
