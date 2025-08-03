/* eslint-disable react-hooks/rules-of-hooks */
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetBorrowQuery } from "@/redux/Api/baseApi";


const borrowBooks = () => {

    const { data, isLoading, error } = useGetBorrowQuery();

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Something went wrong.</p>;

    return (
        <div>
            <div className="font-[Montserrat]">
                <Table>
                    <TableHeader className="bg-[#E59285]">
                        <TableRow>
                            <TableHead className="text-white">No</TableHead>
                            <TableHead className="text-white">Title</TableHead>
                            <TableHead className="text-white">ISBN</TableHead>
                            <TableHead className="text-white">Total Borrowed</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data && data.length > 0 ? (
                            data.map((item, idx) => (
                                <TableRow key={idx}>
                                    <TableCell className="font-medium">{idx+1}</TableCell>
                                    <TableCell className="font-medium">{item.book.title}</TableCell>
                                    <TableCell className="py-3 font-medium">{item.book.isbn}</TableCell>
                                    <TableCell>{item.totalQuantity}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center py-4">
                                    No data found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

        </div>
    );
};

export default borrowBooks;